import React, { useState, useEffect } from 'react';
import { ResendLink } from '../button/ResendLink';
import { NewPassword } from '../NewPassword/NewPassword';

export const Verification: React.FC = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showNewPassword, setShowNewPassword] = useState(false); // State to manage which component to show

  // Handles input change and auto-focus for the next input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);

    if (e.target.value && index < 3) {
      const nextInput = document.getElementById(`code-input-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  // Handles backspace key to move to the previous input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle resend button click
  const handleResend = () => {
    setTimeLeft(30);
    setCode(['', '', '', '']);
    console.log('Resend code clicked');
  };

  // Handle Continue button click
  const handleContinue = () => {
    setShowNewPassword(true); // Show the NewPassword component
  };

  return (
    <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg w-full max-w-sm sm:max-w-md md:w-[560px] text-center">
      {showNewPassword ? (
        <NewPassword />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-[#C473FF] mb-4">Verification</h1>
          <p className="text-gray-600 mb-6">Enter your 4-digit code that you received on your email.</p>

          <div className="flex justify-center gap-2 mb-6"> {/* Centered and adjusted spacing */}
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                maxLength={1}
                className="border border-gray-300 rounded-lg w-12 h-12 text-center text-2xl focus:border-[#C473FF] outline-none"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <div className="text-gray-600 mb-6">
            <span className="text-lg">{timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`}</span>
          </div>

          <button
            className="w-full bg-[#C473FF] text-white py-3 rounded-lg text-lg font-semibold mb-4"
            onClick={handleContinue}
          >
            Continue
          </button>

          <ResendLink onResend={handleResend} />
        </>
      )}
    </div>
  );
};
