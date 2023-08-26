import React from "react";
import { useDropdown } from "./dropdown-context";

const Options = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();

  const handleClick = () => {
    onClick && onClick(); //khi có onClick thì thực hiện hàm onClick
    setShow(false); //đồng thời setShow = false để đóng dropdown
  };

  return (
    <div
      className="px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100 "
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Options;
