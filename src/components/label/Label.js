import React from "react";
import styled from "styled-components";

const LabelStyles = styled.label`
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.grayDark};
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
};

export default Label;
