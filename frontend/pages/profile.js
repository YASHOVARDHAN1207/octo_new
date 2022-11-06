import React from "react";

const ProfilePage = () => {
  return (
    <div className="h-screen flex items-center justify-center w-[80%]">
      <div className="flex flex-row justify-between items-center">
        {/* Profile Image */}
        <img
          alt="User Avatar"
          className="h-64 w-64 flex-[0.4] rounded-full"
          src="https://avatars.dicebear.com/api/adventurer/octo.svg"
        />
        {/* Data */}
        <div className="flex flex-col text-gray-400">
          <h2 className="text-4xl">Profile of {/* Email Comes here */} </h2>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
