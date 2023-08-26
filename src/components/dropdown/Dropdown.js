import React, { useState } from "react";
import { DropdownProvider } from "./dropdown-context";

const Dropdown = ({ children, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full z-30 ">{children}</div>
    </DropdownProvider>
  );
};

export default Dropdown;
