import React from "react";
// import { ChevronDownIcon } from "@heroicons/react/24/solid";
import logo from "../assets/img/octo_logo.png";

const Navbar = ({ setLogin }) => {
  return (
    <div className="bg-[#0f0f0f] h-[72px] w-full flex items-center justify-between">
      <div className="flex space-x-4 items-center justify-center mx-3">
        <img className="h-10 w-10" src={logo.src} />
        <span className="font-bold text-[#e3ffa8] text-2xl">Octo</span>
      </div>
      <div className="flex space-x-4">
      <button className="text-[#e3ffa8] transition duration-200 p-3 rounded-lg hover:text-black hover:bg-[#e3ffa8]">
          <span>Home</span>
        </button>
        <button className="text-[#e3ffa8] transition duration-200 p-3 rounded-lg hover:text-black hover:bg-[#e3ffa8]">
          <span>About Us</span>
        </button>
        <button className="text-[#e3ffa8] transition duration-200 p-3 rounded-lg hover:text-black hover:bg-[#e3ffa8]">
          <span>Pricing</span>
        </button>
      </div>
      <div className="flex space-x-4 items-center mr-2">
        {/* <img
          src="https://avatars.dicebear.com/api/adventurer/data.svg"
          className="rounded-full h-10 w-10"
          alt="User Avatar"
        />
        <span className="text-white">John Doe</span>
        <div className="flex items-center p-3 hover:opacity-70 hover:cursor-pointer">
          <ChevronDownIcon color="white" className="h-6 w-6" />
        </div> */}
        <button
          className="p-4 bg-gray-100 text-gray-900 rounded-lg"
          onClick={() => setLogin(true)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
