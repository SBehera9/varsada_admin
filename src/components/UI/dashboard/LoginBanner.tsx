import React from 'react';
import logo from '../../../Svg/logo.svg';
import img from '../../../Svg/img.svg';


export const LoginBanner: React.FC = () => {
  return (
    <div className="bg-[#F8EDEB] p-8">

      <div className="flex justify-left p-4">
        <img src={logo} alt="logo" className="w-358px h-308px" />
      </div>

      <div className="flex justify-center p-4">
        <img src={img} alt="loginImage" className="w-358px h-308px" />
      </div>

      <div className="p-4 text-center ">
          <h2 className="text-2xl font-bold">Welcome to Admin Dashboard</h2>
          <p className="mt-2 text-gray-700">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  pariatur. Excepteur sipidatat non proident.
          </p>
      </div>

    </div>
  );
};
