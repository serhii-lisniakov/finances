import React, {memo, PropsWithChildren} from "react";
import styled from "styled-components";
import {Backgrounds} from "../models/Backgrounds";

type Props = {
    bg?: Backgrounds;
}

const StyledHighlighter = styled.span<Props>`
  display: inline-flex;
  justify-content: center;
  padding: 3px 5px;
  border-radius: 10px;
  background: ${({theme, bg}) => theme.backgrounds[bg || 'primary']};
  color: ${({bg}) => bg === 'hot' ? 'black' : 'white'};
  letter-spacing: 1px;

  *:not(input) {
    color: ${({bg}) => bg === 'hot' ? 'black' : 'white'};
  }
`;

const Highlighter: React.FC<Props & PropsWithChildren> = (props) => {
    const {children, ...nextProps} = props;

    return (
        <StyledHighlighter {...nextProps}>
            {children}
        </StyledHighlighter>
    )
}

export default memo(Highlighter);
