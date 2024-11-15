// SuccessMessage.tsx
import React from 'react';
import { Button } from '../button/Button';

interface SuccessMessageProps {
  onContinue: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ onContinue }) => {
  return (
   
      <div className="mb-6 text-center">
        <img src="/path/to/success-icon.png" alt="Success Icon" className="mx-auto mb-4" />
      
      <h1 className="text-2xl font-bold text-[#C473FF] mb-4">Successfully</h1>
      <p className="text-gray-600 mb-6">Your password has been reset successfully</p>
      <Button text="Continue" onClick={onContinue} />
      </div>
  );
};
