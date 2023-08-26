import React from "react";
import PropTypes from "prop-types";
const Toggle = (props) => {
  const { on, onClick, ...rest } = props;

  return (
    <label className="contents">
      <input
        type="checkbox"
        checked={on}
        onClick={onClick}
        className="hidden-input "
        onChange={() => {}}
      />
      <div
        className={`inline-block w-[70px] h-[42px] relative cursor-pointer p-1 rounded-full transition-all ${
          on ? "bg-green-400" : "bg-gray-300"
        }`}
        {...rest}
      >
        <span
          className={`transition-all w-[34px] h-[34px]  bg-white rounded-full inline-block ${
            on ? "translate-x-[28px]" : ""
          }`}
        ></span>
      </div>
    </label>
  );
};

Toggle.propTypes = {
  on: PropTypes.bool,
  onClick: PropTypes.func,
};
export default Toggle;
