import React from "react";
import {Card} from "./components";
import {ThemeToggle} from "./ThemeToggle";
import Currency from "./Currency";
import styled from "styled-components";

const StyledCard = styled(Card)`
  display: flex;
  justify-content: space-between;
`;

export const Header = () => {
    return (
        <StyledCard corners={[25, 25, 2, 2]}>
            <ThemeToggle/>
            <Currency/>
        </StyledCard>
    )
}
