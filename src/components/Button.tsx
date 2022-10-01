import React, {HTMLAttributes} from "react";
import styled from "styled-components";
import {Backgrounds} from "../models/Backgrounds";

type Props = {
    bg?: Backgrounds;
}

const StyledButton = styled.button<Props>`
  text-align: center;
  padding: 2px 5px;
  color: white;
  background: ${({theme, bg}) => theme.backgrounds[bg || 'primary']};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const Button: React.FC<Props & HTMLAttributes<HTMLButtonElement>> = (props) => {
    const {onClick, children, bg} = props;

    return (
        <StyledButton
            bg={bg}
            onClick={onClick && onClick}
        >
            {children}
        </StyledButton>
    )
}
