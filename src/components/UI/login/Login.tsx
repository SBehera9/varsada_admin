import React, { useState } from 'react';
import { LoginEmail } from './LoginEmail';
import { LoginPassword } from './LoginPassword';
import { Button } from './button/Button';
import { ForgotPassword } from './ForgotPassword/ForgotPassword';

export const Login: React.FC = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="flex items-center justify-center p-7">
      {showForgotPassword ? (
        <ForgotPassword />
      ) : (
        <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg w-full max-w-sm sm:max-w-md md:w-[560px]">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#C473FF] text-center mb-4">Login</h1>
          <LoginEmail />
          <LoginPassword />
          <div className="flex justify-between mb-4">
            <span>
              <input type="checkbox" id="rememberMe" className="mr-2" aria-label="Remember me checkbox" />
              <label htmlFor="rememberMe" className="text-gray-700">Remember me</label>
            </span>
            <a
              href="#"
              className="text-[#C473FF] hover:underline"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex justify-center mb-4">
            <h4>Don’t Have an Account?</h4>
            <a href="#" className="text-[#C473FF] ml-2 hover:underline">Create Account</a>
          </div>
          <Button text="Login" />
        </div>
      )}
    </div>
  );
};
