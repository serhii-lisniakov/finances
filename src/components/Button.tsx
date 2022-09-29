import React, {HTMLAttributes} from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  text-align: center;
  padding: 2px 5px;
  color: white;
  background: ${({theme}) => theme.colorPrimary};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  :active {
    background: ${({theme}) => theme.colorPrimary};
  }
`;

type Props = {
}

export const Button: React.FC<Props & HTMLAttributes<HTMLButtonElement>> = (props) => {
    const {onClick, children} = props;

    return (
        <StyledButton
            onClick={onClick && onClick}
        >
            {children}
        </StyledButton>
    )
}
