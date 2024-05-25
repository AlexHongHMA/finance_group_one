"use client";

import React from "react";
import NextTopLoader from "nextjs-toploader";

function ProgressProvider({ children }) {
  return (
    <>
      <NextTopLoader color="#7DCEA0" />
      {children}
    </>
  );
}

export default ProgressProvider;
