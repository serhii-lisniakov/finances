import React, {HTMLAttributes, memo} from "react";
import styled from "styled-components";

const StyledHighlighter = styled.span<Props>`
  display: inline-block;
  padding: 3px 5px;
  border-radius: 10px;
  background: ${({accent}) => accent ? '#3b70eb' : '#ff5497'};
  color: white;
  letter-spacing: 1px;
`

type Props = {
    accent?: boolean;
}

const Highlighter: React.FC<Props & HTMLAttributes<HTMLSpanElement>> = ({accent, children}) => (
    <StyledHighlighter accent={accent}>
        {children}
    </StyledHighlighter>
)

export default memo(Highlighter);
