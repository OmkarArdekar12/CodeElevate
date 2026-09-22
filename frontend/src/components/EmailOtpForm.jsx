import React, { useEffect, useState } from "react";
import { sendEmailOtp, verifyEmailOtp } from "../service/authApi.js";
import Loading2 from "./Loading2.jsx";
import toast from "react-hot-toast";

const EmailOtpForm = ({
  purpose,
  askEmail = true,
  title,
  description,
  onVerified,
  onBack,
}) => {
  const [step, setStep] = useState(askEmail ? "email" : "send");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleSend = async (e) => {
    e?.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await sendEmailOtp(
        purpose,
        askEmail ? email.trim() : undefined,
      );
      setMaskedEmail(data.maskedEmail);
      setCooldown(data.resendAfterSeconds || 60);
      setStep("otp");
      setOtp("");
      toast.success(data.message, { id: "email otp sent" });
    } catch (err) {
      const res = err?.response?.data;
      if (res?.retryAfter) {
        setCooldown(res.retryAfter);
      }
      setError(res?.message || "Couldn't send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await verifyEmailOtp(purpose, otp.trim());
      toast.success(data.message, { id: "email otp verified" });
      onVerified(data);
    } catch (err) {
      setOtp("");
      setError(err?.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const btn =
    "w-full mt-1 text-white py-2 rounded-md hover-text-border cursor-pointer";

  return (
    <form
      onSubmit={step === "otp" ? handleVerify : handleSend}
      className="bg-white rounded-lg shadow-black-300 shadow-md w-full max-w-sm mx-auto text-black transition-all duration-200 ease-in-out"
    >
      <div className="pt-6 px-3">
        <h2 className="text-2xl text-center font-extralight">{title}</h2>
      </div>
      <hr className="text-gray-200 mt-3 mb-3" />
      <p className="text-center text-gray-600 text-base font-light px-4">
        {step === "otp"
          ? `Enter the 6-digit code we sent to ${maskedEmail}.`
          : description}
      </p>

      <div className="p-6">
        {step === "email" && (
          <div className="mb-4">
            <label htmlFor="otp-email" className="text-gray-600 text-sm">
              Email
            </label>
            <input
              id="otp-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mt-2"
              placeholder="you@gmail.com"
              autoComplete="email"
              required
            />
          </div>
        )}

        {step === "otp" && (
          <div className="mb-4">
            <label htmlFor="email-otp" className="text-gray-600 text-sm">
              Email OTP
            </label>
            <input
              id="email-otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full p-2 border rounded mt-2 tracking-widest text-center text-xl"
              placeholder="------"
              autoComplete="one-time-code"
              required
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {step === "otp" ? (
          <>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className={`${btn} ${
                loading || otp.length !== 6
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? <Loading2 text="Verifying..." /> : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={loading || cooldown > 0}
              className={`${btn} mt-3 ${
                loading || cooldown > 0
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-slate-500 hover:bg-slate-600"
              }`}
            >
              {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
            </button>
          </>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className={`${btn} ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <Loading2 text="Sending..." />
            ) : askEmail ? (
              "Send OTP"
            ) : (
              "Send OTP to my email"
            )}
          </button>
        )}

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-full mt-3 text-gray-500 text-sm hover:underline cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EmailOtpForm;
