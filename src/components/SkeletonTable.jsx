import React from "react";

export default function SkeletonTable() {
  return (
    <div>
      <div className=" flex justify-between w-full">
        <div className="mr-8 pb-8 rounded-lg bg-white min-w-[575px] w-full box-shadow-custom">
          <div className="flex justify-between px-8 h-[60px] bg-gray-200 items-center rounded-tl-lg rounded-tr-lg">
            {[1, 2, 3, 4, 5, 6].map((v) => (
              <span key={v} className="loading-skeleton w-24 bg-gray-50" />
            ))}
          </div>
          <div className="mt-10 px-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
              <span
                key={v}
                className="loading-skeleton w-full mt-10 first:mt-0 h-6"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
