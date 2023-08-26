import React, { Fragment, useState } from "react";
import Input from "./Input";
import IconEyeClose from "../icon/IconEyeClose";
import IconEyeOpen from "../icon/IconEyeOpen";

const InputPasswordToggle = ({ control }) => {
  const [tooglePassword, setTooglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
      <Input
        name="password"
        type={tooglePassword ? "text" : "password"}
        placeholder="Enter your Password ..."
        control={control}
      >
        {!tooglePassword ? (
          <IconEyeClose
            className="input-icon"
            onClick={() => setTooglePassword(true)}
          ></IconEyeClose>
        ) : (
          <IconEyeOpen
            className="input-icon"
            onClick={() => setTooglePassword(false)}
          ></IconEyeOpen>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;
