import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  return (
    <div className="bg-[#0f0f0f] h-[72px] w-full flex items-center justify-between">
      <div className="flex flex-col space-y-1 mx-3">
        <span className="text-gray-500">Good Morning</span>
        <span className="text-white">Welcome Back</span>
      </div>
      <div></div>
      <div className="flex space-x-4 items-center mr-2">
        <img
          src="https://avatars.dicebear.com/api/adventurer/data.svg"
          className="rounded-full h-10 w-10"
          alt="User Avatar"
        />
        <span className="text-white">John Doe</span>
        <div className="flex items-center p-3 hover:opacity-70 hover:cursor-pointer">
          <ChevronDownIcon color="white" className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
