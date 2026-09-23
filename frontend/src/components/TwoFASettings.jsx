import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStatus, disable2FA } from "../service/authApi.js";
import EmailOtpForm from "./EmailOtpForm.jsx";
import { useSession } from "../context/SessionContext.jsx";

const TwoFASettings = () => {
  const navigate = useNavigate();
  const { updateUser } = useSession();
  const [status, setStatus] = useState(null);
  const [mode, setMode] = useState("idle");
  const [loading, setLoading] = useState(true);

  const [disableToken, setDisableToken] = useState("");
  const [disableError, setDisableError] = useState("");
  const [disabling, setDisabling] = useState(false);

  const loadStatus = async () => {
    try {
      const { data } = await authStatus();
      setStatus({ isMfaActive: data.isMfaActive, email: data.email });
    } catch (err) {
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const handleDisable = async (e) => {
    e.preventDefault();
    setDisableError("");
    setDisabling(true);
    try {
      await disable2FA(disableToken.trim());
      setStatus((s) => ({ ...s, isMfaActive: false }));
      updateUser({ isMfaActive: false });
      setMode("idle");
      setDisableToken("");
    } catch (err) {
      setDisableToken("");
      setDisableError(err?.response?.data?.message || "Invalid code.");
    } finally {
      setDisabling(false);
    }
  };

  if (loading || !status) return null;

  const btn =
    "flex items-center justify-center rounded-md px-4 py-2 hover-text-border text-lg cursor-pointer";

  return (
    <div className="flex flex-col gap-3 w-[90%] md:w-[50%] my-2 pb-4 border-b">
      <h1 className="text-2xl title-font">Security</h1>

      <div className="flex flex-wrap justify-between items-center title-font text-lg">
        <span>Two-Factor Authentication:</span>
        <span
          className={status.isMfaActive ? "text-green-500" : "text-yellow-400"}
        >
          {status.isMfaActive ? "● On" : "● Off"}
        </span>
      </div>
      <div className="flex flex-wrap justify-between items-center title-font text-lg">
        <span>Verified Email:</span>
        <span className={status.email ? "" : "text-yellow-400"}>
          {status.email || "Not added"}
        </span>
      </div>

      {status.isMfaActive && !status.email && mode === "idle" && (
        <p className="text-sm text-yellow-300">
          Add a verified email so you can reset 2FA if you ever lose your
          authenticator app.
        </p>
      )}

      {mode === "idle" && (
        <div className="flex flex-col gap-2">
          {!status.isMfaActive &&
            (status.email ? (
              <button
                className={`${btn} bg-blue-500 hover:bg-blue-600`}
                onClick={() => navigate("/setup-2fa")}
              >
                Turn on 2FA
              </button>
            ) : (
              <button
                className={`${btn} bg-blue-500 hover:bg-blue-600`}
                onClick={() => setMode("enable")}
              >
                Turn on 2FA (verify email)
              </button>
            ))}
          {status.isMfaActive && (
            <button
              className={`${btn} bg-red-500 hover:bg-red-600`}
              onClick={() => setMode("disable")}
            >
              Turn off 2FA
            </button>
          )}
          <button
            className={`${btn} bg-slate-600 hover:bg-slate-700`}
            onClick={() => setMode("link-email")}
          >
            {status.email ? "Change email" : "Add email"}
          </button>
        </div>
      )}

      {mode === "enable" && (
        <EmailOtpForm
          purpose="enable"
          title="Verify your email"
          description="Enter your email to receive a verification code. 2FA is turned on after you verify it and scan the QR code."
          onVerified={() => navigate("/setup-2fa")}
          onBack={() => setMode("idle")}
        />
      )}

      {mode === "link-email" && (
        <EmailOtpForm
          purpose="link-email"
          title={status.email ? "Change your email" : "Add your email"}
          description="Enter the email you want to link. We'll send a verification code to it."
          onVerified={(data) => {
            setStatus((s) => ({ ...s, email: data.email }));
            updateUser({ hasEmail: true });
            setMode("idle");
          }}
          onBack={() => setMode("idle")}
        />
      )}

      {mode === "disable" && (
        <form
          onSubmit={handleDisable}
          className="bg-white rounded-lg shadow-black-300 shadow-md w-full mx-auto text-black"
        >
          <div className="pt-6 px-3">
            <h2 className="text-2xl text-center font-extralight">
              Turn off 2FA
            </h2>
          </div>
          <hr className="text-gray-200 mt-3 mb-3" />
          <p className="text-center text-gray-600 text-base font-light px-4">
            Enter the current 6-digit code from your authenticator app to
            confirm.
          </p>
          <div className="p-6">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={disableToken}
              onChange={(e) =>
                setDisableToken(e.target.value.replace(/\D/g, ""))
              }
              className="w-full p-2 border rounded mt-2 mb-3 tracking-widest text-center text-xl"
              placeholder="------"
              autoComplete="one-time-code"
              required
            />
            {disableError && (
              <p className="text-red-500 text-sm mb-3">{disableError}</p>
            )}
            <button
              type="submit"
              disabled={disabling || disableToken.length !== 6}
              className={`w-full py-2 rounded-md text-white cursor-pointer ${
                disabling || disableToken.length !== 6
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {disabling ? "Turning off..." : "Confirm: turn off 2FA"}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("idle");
                setDisableToken("");
                setDisableError("");
              }}
              className="w-full mt-3 text-gray-500 text-sm hover:underline cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TwoFASettings;
