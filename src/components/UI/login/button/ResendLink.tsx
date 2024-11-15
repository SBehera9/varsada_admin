// ResendLink.tsx
import React from 'react';

interface ResendLinkProps {
  onResend: () => void;
}

export const ResendLink: React.FC<ResendLinkProps> = ({ onResend }) => {
  return (
    <p>
      If you didn't receive a code!{' '}
      <span
        className="text-[#C473FF] cursor-pointer"
        onClick={onResend}
      >
        Resend
      </span>
    </p>
  );
};
