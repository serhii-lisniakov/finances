import React from "react";
import {Header} from "./Header";
import {Container} from "./components";
import {List} from "./List";
import {Info} from "./Info";
import {Timeline} from "./Timeline";
import styled from "styled-components";
import {Total} from "./Total";

const StyledContainer = styled(Container)`
  display: grid;
  gap: 1em;
  height: 100%;
  grid-template: auto 1fr / 1fr;
`;

const Body = styled.div`
  display: grid;
  gap: 1em;
  grid-template: 1fr / 1fr 25% 20%;
`;

const InfoSection = styled.div`
  display: grid;
  grid-template: 1fr auto / 1fr;
`;

export const Layout = () => {
    return (
        <StyledContainer>
            <Header/>
            <Body>
                <List/>
                <InfoSection>
                    <Info/>
                    <Total/>
                </InfoSection>
                <Timeline/>
            </Body>
        </StyledContainer>
    )
}
