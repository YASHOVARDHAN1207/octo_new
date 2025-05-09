import React, { useState } from "react";
import {
  HomeIcon,
  ChartBarIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  FireIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon, // 🧠 New icon for Chatbot
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import SidebarIcon from "./SidebarIcon";
import logo from "../assets/img/octo_logo.png";
import CryptoSwapModal from "./swapModal";

const Sidebar = ({ signOut }) => {
  const [coins, setCoins] = useState(10);
  const router = useRouter();

  return (
    <div className="w-64 bg-[#0f0f0f] h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-4">
        <img
          src={logo.src}
          alt="Octo_Logo"
          className="h-16 bg-transparent w-16"
        />
        <h3 className="pb-4 text-[#e3ffa8] text-4xl font-bold text-center m-5">
          Octo
        </h3>
      </div>

      {/* Sidebar Icons */}
      <SidebarIcon
        active={router.pathname === "/"}
        label="Home"
        onClickHandler={() => router.replace("/")}
        Icon={<HomeIcon className="h-8 w-8" />}
      />
      <SidebarIcon
        active={router.pathname === "/statistics"}
        label="Statistics"
        onClickHandler={() => router.push("/statistics")}
        Icon={<ChartBarIcon className="h-8 w-8" />}
      />
      <SidebarIcon
        active={router.pathname === "/profile"}
        label="Profile"
        onClickHandler={() => router.push("/profile")}
        Icon={<UserIcon className="h-8 w-8" />}
      />
      <SidebarIcon
        active={router.pathname === "/explore"}
        label="Explore all"
        onClickHandler={() => router.push("/explore")}
        Icon={<UserIcon className="h-8 w-8" />}
      />

      {/* ✅ Chatbot Tab */}
      <SidebarIcon
        active={router.pathname === "/chatbot"}
        label="Chatbot"
        onClickHandler={() => router.push("/chatbot")}
        Icon={<ChatBubbleLeftRightIcon className="h-8 w-8" />}
      />

      {/* CryptoSwap */}
      <CryptoSwapModal />

      {/* Coins and Streak */}

      {/* <SidebarIcon
        active={false}
        onClickHandler={() => router.push("/exercise/selection")}
        cta={true}
        Icon={<PlusIcon className="h-8 w-8" />}
      /> */}

      {/* Logout */}
      <SidebarIcon
        onClickHandler={signOut}
        active={false}
        label="Logout"
        Icon={<ArrowLeftOnRectangleIcon className="h-8 w-8" />}
      />
    </div>
  );
};

export default Sidebar;
