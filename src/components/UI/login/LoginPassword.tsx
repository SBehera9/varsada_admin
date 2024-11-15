import React from 'react';

export const LoginPassword: React.FC = () => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Password</label>
      <input type="password" className="border-b border-[#C473FF] w-full px-3 py-2 mb-4 outline-none" />
    </div>
  );
};
