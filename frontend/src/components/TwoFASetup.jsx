import React, { useEffect, useState } from "react";
import { setup2FA, confirm2FASetup } from "../service/authApi.js";
import Loading2 from "./Loading2.jsx";
import toast from "react-hot-toast";

const TwoFASetup = ({ onSetupComplete, onNotAllowed }) => {
  const [response, setResponse] = useState({ secret: "", qrCode: "" });
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQRCode = async () => {
    try {
      const { data } = await setup2FA();
      setResponse(data);
    } catch (err) {
      if (err?.response?.status === 403) {
        toast.error("Please verify your email first.", {
          id: "setup not allowed",
        });
        onNotAllowed && onNotAllowed();
      } else {
        setError("Couldn't load the QR code. Please reload the page.");
      }
    }
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  const copyClipBoard = async () => {
    await navigator.clipboard.writeText(response.secret);
    setMessage("Secret copied to clipboard");
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await confirm2FASetup(code.trim());
      onSetupComplete(data);
    } catch (err) {
      setCode("");
      setError(err?.response?.data?.message || "Invalid code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-black-300 shadow-md w-full max-w-sm mx-auto text-black transition-all duration-200 ease-in-out">
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

        <form onSubmit={handleConfirm}>
          <label htmlFor="setup-totp" className="text-gray-600 text-sm">
            Enter the 6-digit code shown in your app to finish
          </label>
          <input
            id="setup-totp"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="w-full p-2 border rounded mt-2 mb-3 tracking-widest text-center text-xl"
            placeholder="------"
            required
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            disabled={loading || code.length !== 6 || !response.secret}
            className={`w-full text-white py-2 rounded-md hover-text-border ${
              loading || code.length !== 6 || !response.secret
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            }`}
          >
            {loading ? (
              <Loading2 text="Verifying..." />
            ) : (
              "Verify & Turn on 2FA"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TwoFASetup;

// import React, { useEffect, useState } from "react";
// import { setup2FA } from "../service/authApi.js";

// const TwoFASetup = ({ onSetupComplete }) => {
//   const [response, setResponse] = useState({ secret: "", qrCode: "" });
//   const [message, setMessage] = useState("");

//   const fetchQRCode = async () => {
//     const { data } = await setup2FA();
//     setResponse(data);
//   };

//   useEffect(() => {
//     fetchQRCode();
//   }, []);

//   const copyClipBoard = async () => {
//     await navigator.clipboard.writeText(response.secret);
//     setMessage("Secret copied to clipboard");
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-black-300 shadow-md w-full max-w-sm mx-auto text-black transition-all duration-200 ease-in-out">
//       <div className="pt-3">
//         <h2 className="text-2xl text-center font-extralight">
//           Turn on <br />
//           Two Factor Authentication (2FA) <br />
//           Verification
//         </h2>
//       </div>
//       <hr className="text-gray-200 mt-2 mb-3" />
//       <p className="text-center text-gray-600 text-lg font-light pr-6 pl-6">
//         Scan the QR code below with your authenticator app
//       </p>
//       <div className="p-6">
//         <div className="flex justify-center">
//           {response.qrCode && (
//             <img
//               src={response.qrCode}
//               alt="2FA QR Code"
//               className="mb-4 border rounded-md"
//             />
//           )}
//         </div>
//         <div className="flex items-center mt-3 mb-3">
//           <div className="border-t border-1 border-gray-200 flex-grow"></div>
//           <div className="text-gray-600 text-sm font-light pr-2 pl-2">
//             OR enter the code manually
//           </div>
//           <div className="border-t border-1 border-gray-200 flex-grow"></div>
//         </div>
//         <div className="mb-3">
//           {message && (
//             <p className="text-green-600 text-sm font-semibold mb-3">
//               {message}
//             </p>
//           )}
//           <input
//             readOnly
//             value={response.secret || ""}
//             className="w-full border rounded mt-2 text-xs text-gray-600 p-4"
//             placeholder="Enter the Code"
//             onClick={copyClipBoard}
//           />
//         </div>
//         <button
//           onClick={onSetupComplete}
//           className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover-text-border cursor-pointer"
//         >
//           Continue to Verification
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TwoFASetup;
