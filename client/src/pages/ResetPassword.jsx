import React, { useState, useRef, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/appContext"; // Added the import here
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const { backendUrl } = useContext(AppContent); // Accessed context properly

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [isEmailSend, setIsEmailSend] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = useRef([]);
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInput = (event, index) => {
    if (event.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault(); // Fixed from onClick to onSubmit

    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSend(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault(); // Fixed missing parameter e

    try {
      const { data } = await axios.post(backendUrl + "/api/auth/reset-password", {
        email,
        otp,
        newpassword,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        alt="logo"
      />

      {/* Enter email id */}
      {!isEmailSend && (
        <form
          onSubmit={onSubmitEmail} // Fixed here to onSubmit
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email address
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} className="w-3 h-3" alt="" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Id"
              required
              className="bg-transparent outline-none text-white"
            />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3">
            Submit
          </button>
        </form>
      )}

      {/* OTP input form */}
      {!isOtpSubmitted && isEmailSend && (
        <form
          onSubmit={onSubmitOTP}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to your email id.
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                />
              ))}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-800 text-white rounded-md font-medium"
          >
            Submit
          </button>
        </form>
      )}

      {/* Enter new password */}
      {isOtpSubmitted && isEmailSend && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the new Password Below
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} className="w-3 h-3" alt="" />
            <input
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="New Password"
              required
              className="bg-transparent outline-none text-white"
            />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
