import React from "react";

const SidebarIcon = ({ active, cta, Icon, onClickHandler }) => {
  return (
    <button
      type="button"
      onClick={onClickHandler}
      className={
        cta
          ? "flex items-center rounded-xl px-3 py-2 hover:rounded-md justify-center transition-all duration-200 m-4 hover:cursor-pointer bg-[#e3ffa8] text-black"
          : `${
              active ? "bg-[#e3ffa8] text-black" : "bg-[#0f0f0f] text-gray-50"
            } flex items-center hover:rounded-md rounded-xl hover:bg-[#e3ffa8] hover:text-black justify-center hover:cursor-pointer transition-all duration-200 px-3 py-2 m-4`
      }
    >
        {Icon}
    </button>
  );
};

export default SidebarIcon;
