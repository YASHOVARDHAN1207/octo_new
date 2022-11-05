import React, { useState } from "react";
import {
  HomeIcon,
  ChartBarIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import SidebarIcon from "./SidebarIcon";

const Sidebar = () => {
  const [active, setActive] = useState(false);
  const router = useRouter();
  return (
    <div className="w-64 bg-[#0f0f0f] h-screen flex flex-col">
      {/* Logo */}
      <h3 className="pb-4 text-[#e3ffa8] text-4xl font-bold text-center m-5">Octo</h3>
      {/* Icons */}
      <SidebarIcon
        active={true}
        label="Home"
        onClickHandler={() => router.replace("/")}
        Icon={<HomeIcon className="h-8 w-8" />}
      />
      <SidebarIcon active={false} label="Statistics" Icon={<ChartBarIcon className="h-8 w-8" />} />
      <SidebarIcon
        active={false}
        onClickHandler={() => router.push("/profile")}
        Icon={<UserIcon className="h-8 w-8" />}
        label="Profile"
      />
      {/* <SidebarIcon
        active={false}
        onClickHandler={() => router.push("/exercise/selection")}
        cta={true}
        Icon={<PlusIcon className="h-8 w-8" />}
      /> */}
      <SidebarIcon
        active={false}
        label="Logout"
        Icon={<ArrowLeftOnRectangleIcon className="h-8 w-8" />}
      />
    </div>
  );
};

export default Sidebar;
