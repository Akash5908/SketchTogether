import React from "react";
import { iconsProps } from "../utils/type";

const SqareIcon = ({ width, height }: iconsProps) => {
  return (
    <div id="svg-div">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-square"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
      </svg>
    </div>
  );
};

export default SqareIcon;
