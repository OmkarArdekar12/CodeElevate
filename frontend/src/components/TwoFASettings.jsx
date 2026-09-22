import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStatus } from "../service/authApi.js";
import EmailOtpForm from "./EmailOtpForm.jsx";
import { useSession } from "../context/SessionContext.jsx";

const TwoFASettings = () => {
  const navigate = useNavigate();
  const { updateUser } = useSession();
  const [status, setStatus] = useState(null);
  const [mode, setMode] = useState("idle");
  const [loading, setLoading] = useState(true);

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
    </div>
  );
};

export default TwoFASettings;
