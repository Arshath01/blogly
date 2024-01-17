import React from "react";

export default function Loading() {
  return (
    <div className="p-4 w-full mx-auto bg-white mt-10 rounded-md ">
      <div className="animate-pulse flex flex-col h-[250px] lg:h-[330px] w-full">
        <div className="bg-gray-300 h-4 w-2/3 mb-4"></div>
        <div className="bg-gray-200 flex-auto mb-4 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2"></div>
      </div>
    </div>
  );
}
