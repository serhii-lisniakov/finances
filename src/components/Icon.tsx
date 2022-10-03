import React, {HTMLAttributes} from "react";
import styled from "styled-components";
import {useAppSelector} from "../hook";
import {themes, ThemesNames} from "../styles/themes";

const StyledStatus = styled.span`
  cursor: pointer;
  font-size: 1.25em;
  text-align: center;
`;

const IconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
    icon?: string;
    color?: string;
}

export const Icon: React.FC<Props & HTMLAttributes<HTMLSpanElement>> = (props) => {
    const {theme} = useAppSelector(state => state.theme);
    const {icon, color, onClick} = props;

    const isFilled = `${themes[theme]._name === ThemesNames.Light ? ' filled' : ''}`

    return (
        <IconContainer>
            <StyledStatus
                onClick={onClick && onClick}
                className={`material-symbols-outlined${isFilled}`}
                style={{color}}
            >
                {icon}
            </StyledStatus>
        </IconContainer>
    )
}
