import React from "react";

const SidebarIcon = ({ active, Icon, onClickHandler, label, end }) => {
  return (
    <button
      type="button"
      onClick={onClickHandler}
      className={`${
        active ? "bg-[#e3ffa8] text-black" : "bg-[#0f0f0f] text-gray-50"
      } flex items-center hover:rounded-md rounded-xl space-x-4 hover:bg-[#e3ffa8] hover:text-black justify-start hover:cursor-pointer transition-all duration-200 px-3 py-2 m-4 ${
        end && "mt-auto"
      }`}
    >
      {Icon}
      <span className={`text-lg`}>{label}</span>
    </button>
  );
};

export default SidebarIcon;
