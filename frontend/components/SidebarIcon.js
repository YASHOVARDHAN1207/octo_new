import React from "react";

const SidebarIcon = ({ active, cta, Icon, onClickHandler, label }) => {
  return (
    <button
      type="button"
      onClick={onClickHandler}
      className={
        cta
          ? "flex items-center rounded-xl px-3 py-2 space-x-4 hover:rounded-md justify-start transition-all duration-200 m-4 hover:cursor-pointer bg-[#e3ffa8] text-black"
          : `${
              active ? "bg-[#e3ffa8] text-black" : "bg-[#0f0f0f] text-gray-50"
            } flex items-center hover:rounded-md rounded-xl space-x-4 hover:bg-[#e3ffa8] hover:text-black justify-start hover:cursor-pointer transition-all duration-200 px-3 py-2 m-4`
      }
    >
        {Icon}
        <span className={`text-lg`}>{label}</span>
    </button>
  );
};

export default SidebarIcon;
