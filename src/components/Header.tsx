import React from "react";
import {Card, FlexContainer} from "./components";
import {ThemeToggle} from "./ThemeToggle";
import Currency from "./Currency";
import styled from "styled-components";
import {Auth} from "./Auth";

const Wrapper = styled.div`
  padding: 15px 15px 0;
`;

const StyledCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;

export const Header = () => {
    return (
        <Wrapper>
            <StyledCard corners={[25, 25, 2, 2]}>
                <FlexContainer>
                    <ThemeToggle/>
                    <Auth/>
                </FlexContainer>
                <Currency/>
            </StyledCard>
        </Wrapper>
    )
}
