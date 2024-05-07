import React from "react";

export const Home = () => {
  return (
    <div className="flex justify-center items-center mt-10 relative">
      <div className="absolute inset-x-0 h-96 bg-slate-300 opacity-50 top-1/2 transform -translate-y-1/2"></div>
      <img src={"/logo.png"} className="w-5/12 z-10 relative" />
    </div>
  );
};
