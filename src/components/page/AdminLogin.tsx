import React from 'react';
import { Login } from '../UI/login/Login';
import SafeArea from '../UI/layout/SafeArea';
import { LoginBanner } from '../UI/dashboard/LoginBanner';

export const AdminLogin: React.FC = () => {
  return (
    <SafeArea >
      <div className="flex min-h-screen ">
        <LoginBanner />
      <Login />
    </div>
    </SafeArea>
  );
};
