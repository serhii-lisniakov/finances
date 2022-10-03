import React from "react";
import {Header} from "./Header";
import {Container} from "./components";
import {Goals} from "./Goals";
import {Info} from "./Info";
import {Timeline} from "./Timeline";
import styled from "styled-components";
import {Total} from "./Total";

const StyledContainer = styled(Container)`
  display: grid;
  height: 100vh;
  grid-template: auto 1fr / 1fr;
`;

const Body = styled.div`
  padding: 15px;
  display: grid;
  gap: 1em;
  grid-template: minmax(300px, 1fr) / 1fr 30% 20%;
  overflow: auto;
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
                <Goals/>
                <InfoSection>
                    <Info/>
                    <Total/>
                </InfoSection>
                <Timeline/>
            </Body>
        </StyledContainer>
    )
}
