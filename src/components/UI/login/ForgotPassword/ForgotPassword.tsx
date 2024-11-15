import React, { useState } from 'react';
import { Button } from '../button/Button';
import { Verification } from '../Verification/Verification'; // Adjust if using default export

export const ForgotPassword: React.FC = () => {
  const [showVerification, setShowVerification] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowVerification(true); // Proceed to verification step
  };

  if (showVerification) {
    return <Verification />;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 shadow-lg rounded-lg w-full max-w-sm sm:max-w-md md:w-[560px]">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#C473FF] text-center mb-4">Forgot Password</h1>
      <p className="text-center text-gray-600 mb-6">
        Enter your email for the verification process, we will send a 4 digits code to your email.
      </p>
      <input
        type="email"
        placeholder="E-mail"
        className="border-b border-[#C473FF] w-full px-3 py-2 mb-4 outline-none"
      />
      <Button text="Continue" onClick={() => setShowVerification(true)} />
    </form>
  );
};
