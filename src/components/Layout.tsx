import React from "react";
import {Header} from "./Header";
import {FlexContainerColumn} from "./components";
import {Goals} from "./Goals";
import {Info} from "./Info";
import {Timeline} from "./Timeline";
import styled from "styled-components";
import {Total} from "./Total";
import {auth} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {Credits} from "./Credits";

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StyledContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template: auto 1fr / 1fr;
`;

const Body = styled.div`
  padding: 15px;
  display: grid;
  gap: 1em;
  grid-template: minmax(300px, 1fr) / 1fr 1fr;
  overflow: auto;
`;

const InfoSection = styled.div`
  display: grid;
  grid-template: auto 1fr / 1fr;
  gap: 1em;
`;

const InfoSectionInner = styled(InfoSection)`
  grid-template: 1fr / 1fr 30%;
`;

export const Layout = () => {
    const [user, loading] = useAuthState(auth);

    return (
        <StyledContainer>
            <Header/>
            {loading && <Loader>Loading...</Loader>}
            {user &&
                <Body>
                    <Goals/>
                    <InfoSection>
                        <InfoSectionInner>
                            <FlexContainerColumn>
                                <Info/>
                                <Total/>
                            </FlexContainerColumn>
                            <Timeline/>
                        </InfoSectionInner>
                        <Credits/>
                    </InfoSection>
                </Body>
            }
        </StyledContainer>
    )
}
