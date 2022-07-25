import React from "react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full mt-8">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500"></div>
    </div>
  );
};