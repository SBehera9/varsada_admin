import React, { useState } from 'react';
import { Button } from '../button/Button';
import { ResendLink } from '../button/ResendLink';
import { SuccessMessage } from '../SuccessMessage/SuccessMessage';

export const NewPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResend = () => {
    console.log('Resend clicked');
  };

  const handleContinue = () => {
    setIsSuccess(true);
  };

  const handleSuccessContinue = () => {
    console.log('Success Continue clicked');
  };

  return (
    <div className="text-center">
      {isSuccess ? (
        <SuccessMessage onContinue={handleSuccessContinue} />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-[#C473FF] mb-4">New Password</h1>
          <p className="text-gray-600 mb-6">
            Set the new password for your account so you can login and access all features.
          </p>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Enter New Password"
              className="border-b border-[#C473FF] w-full px-3 py-2 mb-4 outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="border-b border-[#C473FF] w-full px-3 py-2 mb-4 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button text="Continue" onClick={handleContinue} />
          <ResendLink onResend={handleResend} />
        </>
      )}
    </div>
  );
};
