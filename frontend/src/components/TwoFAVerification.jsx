import React, { useState } from "react";
import { verify2FA, reset2FA, sendResetOtp } from "../service/authApi.js";
import toast from "react-hot-toast";

const TwoFAVerification = ({ onVerifySuccess, onResetSuccess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const [resetStep, setResetStep] = useState(0); // 0=hidden, 1=sent, 2=verifying
  const [resetOtp, setResetOtp] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const handleTokenVerification = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verify2FA(otp);
      onVerifySuccess(data);
      toast.success("Valid OTP.", { id: "otp success" });
    } catch (error) {
      setOtp("");
      setError("Invalid OTP");
      toast.error("Invalid OTP!", { id: "otp failed" });
    }
  };

  const handleSendResetOtp = async () => {
    setResetLoading(true);
    setError("");
    try {
      await sendResetOtp();
      setResetStep(1);
      toast.success("OTP sent to your registered email.", {
        id: "reset otp sent",
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to send OTP. Make sure you have an email set in your profile.",
      );
      toast.error("Failed to send OTP!", { id: "reset otp failed" });
    } finally {
      setResetLoading(false);
    }
  };

  const handleConfirmReset = async () => {
    if (!resetOtp) return;
    setResetLoading(true);
    setError("");
    try {
      const { data } = await reset2FA(resetOtp);
      onResetSuccess(data);
      toast.success("2FA reset successfully.", { id: "reset success" });
    } catch (err) {
      setResetOtp("");
      setError(err?.response?.data?.message || "Invalid or expired OTP.");
      toast.error("Reset failed!", { id: "reset failed" });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleTokenVerification}
      className="bg-white rounded-lg shadow-black-300 shadow-md w-full max-w-sm mx-auto text-black transition-all duration-200 ease-in-out"
    >
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">
          Validate Time-based One-Time Password (TOTP)
        </h2>
      </div>
      <hr className="text-gray-200 mt-3 mb-3" />
      <p className="text-center text-gray-600 text-lg font-light px-2">
        Please enter 6-digit Time based OTP to verify Two-Factor Authentication
        (2FA)
      </p>
      <div className="p-6">
        <div className="mb-4">
          <label htmlFor="totp" className="text-gray-600 text-sm">
            TOTP
          </label>
          <input
            id="totp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter Your TOTP"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full mt-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover-text-border mb-3 cursor-pointer"
        >
          Verify TOTP
        </button>

        <hr className="text-gray-200 mb-3" />
        <p className="text-center text-gray-500 text-sm mb-2">
          Lost access to your authenticator?
        </p>

        {resetStep === 0 && (
          <button
            type="button"
            disabled={resetLoading}
            onClick={handleSendResetOtp}
            className="w-full mt-1 bg-slate-500 text-white py-2 rounded-md hover:bg-slate-600 hover-text-border cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {resetLoading ? "Sending..." : "Send OTP to Reset 2FA"}
          </button>
        )}

        {resetStep === 1 && (
          <div>
            <p className="text-green-600 text-sm mb-2 text-center">
              OTP sent to your registered email.
            </p>
            <label className="text-gray-600 text-sm">Enter OTP</label>
            <input
              type="text"
              value={resetOtp}
              onChange={(e) => setResetOtp(e.target.value)}
              className="w-full p-2 border rounded mt-2 mb-3"
              placeholder="Enter the OTP from your email"
            />
            <button
              type="button"
              disabled={resetLoading || !resetOtp}
              onClick={handleConfirmReset}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {resetLoading ? "Verifying..." : "Confirm Reset 2FA"}
            </button>
            <button
              type="button"
              onClick={() => {
                setResetStep(0);
                setResetOtp("");
                setError("");
              }}
              className="w-full mt-2 text-gray-500 text-sm underline cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default TwoFAVerification;

// import React, { useState } from "react";
// import { verify2FA, reset2FA } from "../service/authApi.js";
// import toast from "react-hot-toast";

// const TwoFAVerification = ({ onVerifySuccess, onResetSuccess }) => {
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");

//   const handleTokenVerification = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await verify2FA(otp);
//       onVerifySuccess(data);
//       toast.success("Valid OTP.", { id: "otp success" });
//     } catch (error) {
//       setOtp("");
//       //console.log("The error is: ", error.message);
//       setError("Invalid OTP");
//       toast.error("Invalid OTP!", { id: "otp failed" });
//     }
//   };

//   const handleReset = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await reset2FA();
//       onResetSuccess(data);
//       toast.success("Two-factor Authentication reset successfully.", {
//         id: "reset success",
//       });
//     } catch (error) {
//       //console.log("The error is: ", error.message);
//       setError("Reset failed. Try again.");
//       toast.error("Two-factor Authentication reset failed!", {
//         id: "reset failed",
//       });
//     }
//   };

//   return (
//     <form
//       onSubmit={handleTokenVerification}
//       className="bg-white rounded-lg shadow-black-300 shadow-md w-full max-w-sm mx-auto text-black transition-all duration-200 ease-in-out"
//     >
//       <div className="pt-6">
//         <h2 className="text-3xl text-center font-extralight">
//           Validate Time-based One-Time Password (TOTP)
//         </h2>
//       </div>
//       <hr className="text-gray-200 mt-3 mb-3" />
//       <p className="text-center text-gray-600 text-lg font-light px-2">
//         Please enter 6-digit Time based OTP to verify Two-Factor Authentication
//         (2FA) Verification
//       </p>
//       <div className="p-6">
//         <div className="mb-4">
//           <label htmlFor="totp" className="text-gray-600 text-sm">
//             TOTP
//           </label>
//           <input
//             id="totp"
//             label="TOPT"
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className="w-full p-2 border rounded mt-2"
//             placeholder="Enter Your TOTP"
//             required
//           />
//         </div>
//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
//         <button
//           type="submit"
//           className="w-full mt-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover-text-border mb-3 cursor-pointer"
//         >
//           Verify TOTP
//         </button>
//         <button
//           type="button"
//           className="w-full mt-1 bg-slate-500 text-white py-2 rounded-md hover:bg-slate-600 hover-text-border cursor-pointer"
//           onClick={handleReset}
//         >
//           Reset 2FA
//         </button>
//       </div>
//     </form>
//   );
// };

// export default TwoFAVerification;
