import React, { useState } from "react";
import { verify2FA, reset2FA } from "../service/authApi";

const TwoFAVerification = ({ onVerifySuccess, onResetSuccess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleTokenVerification = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verify2FA(otp);
      onVerifySuccess(data);
    } catch (error) {
      setOtp("");
      console.log("The error is: ", error.message);
      setError("Invalid OTP");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const { data } = await reset2FA();
      onResetSuccess(data);
    } catch (error) {
      console.log("The error is: ", error.message);
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleTokenVerification}
      className="bg-white rounded-lg shadow-black-300 shadow-md w-full max-w-sm mx-auto text-black"
    >
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">
          Validate Time-based One-Time Password (TOTP)
        </h2>
      </div>
      <hr className="text-gray-200 mt-3 mb-3" />
      <p className="text-center text-gray-600 text-lg font-light px-2">
        Please enter 6-digit Time based OTP to verify Two-Factor Authentication
        (2FA) Verification
      </p>
      <div className="p-6">
        <div className="mb-4">
          <label htmlFor="totp" className="text-gray-600 text-sm">
            TOTP
          </label>
          <input
            id="totp"
            label="TOPT"
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
          className="w-full mt-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover-text-border mb-3"
        >
          Verify TOTP
        </button>
        <button
          type="submit"
          className="w-full mt-1 bg-slate-500 text-white py-2 rounded-md hover:bg-slate-600 hover-text-border"
          onClick={handleReset}
        >
          Reset 2FA
        </button>
      </div>
    </form>
  );
};

export default TwoFAVerification;
