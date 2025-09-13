import React, { useEffect, useState } from "react";
import { setup2FA } from "../service/authApi";

const TwoFASetup = ({ onSetupComplete }) => {
  const [response, setResponse] = useState({ secret: "", qrCode: "" });
  const [message, setMessage] = useState("");

  const fetchORCode = async () => {
    const { data } = await setup2FA();
    setResponse(data);
  };

  useEffect(() => {
    fetchORCode();
  }, []);

  const copyClipBoard = async () => {
    await navigator.clipboard.writeText(response.secret);
    setMessage("Secret copied to clipboard");
  };

  return (
    <div className="bg-white rounded-lg shadow-black-300 shadow-md w-full max-w-sm mx-auto text-black">
      <div className="pt-3">
        <h2 className="text-2xl text-center font-extralight">
          Turn on <br />
          Two Factor Authentication (2FA) <br />
          Verification
        </h2>
      </div>
      <hr className="text-gray-200 mt-2 mb-3" />
      <p className="text-center text-gray-600 text-lg font-light pr-6 pl-6">
        Scan the QR code below with your authenticator app
      </p>
      <div className="p-6">
        <div className="flex justify-center">
          {response.qrCode && (
            <img
              src={response.qrCode}
              alt="2FA QR Code"
              className="mb-4 border rounded-md"
            />
          )}
        </div>
        <div className="flex items-center mt-3 mb-3">
          <div className="border-t border-1 border-gray-200 flex-grow"></div>
          <div className="text-gray-600 text-sm font-light pr-2 pl-2">
            OR enter the code manually
          </div>
          <div className="border-t border-1 border-gray-200 flex-grow"></div>
        </div>
        <div className="mb-3">
          {message && (
            <p className="text-green-600 text-sm font-semibold mb-3">
              {message}
            </p>
          )}
          <input
            readOnly
            value={response.secret || ""}
            className="w-full border rounded mt-2 text-xs text-gray-600 p-4"
            placeholder="Enter the Code"
            onClick={copyClipBoard}
          />
        </div>
        <button
          onClick={onSetupComplete}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover-text-border"
        >
          Continue to Verification
        </button>
      </div>
    </div>
  );
};

export default TwoFASetup;
