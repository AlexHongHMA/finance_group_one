import React from "react";

function MaxWidthWrapper({ children }) {
  return <div className="max-w-[1200px] mx-auto py-10">{children}</div>;
}

export default MaxWidthWrapper;
