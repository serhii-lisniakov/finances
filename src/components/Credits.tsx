import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hook";
import NewGoal from "./NewItem";
import {Card, FlexContainerColumn, List} from "./components";
import {addCredit, getCredits} from "../store/creditsSlice";
import Highlighter from "./Highlighter";
import styled from "styled-components";
import {CreditItem} from "./CreditItem";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";

const StyledCard = styled(Card)`
  display: grid;
  grid-template: auto 1fr / 1fr;

  > div:first-child {
    padding: 1em 1em 0;
  }
`;

export const Credits: React.FC = () => {
    const [user] = useAuthState(auth);
    const credits = useAppSelector(state => state.credits);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCredits(user?.uid));
    }, [])

    return (
        <StyledCard>
            <FlexContainerColumn>
                <Highlighter bg={'warn'}>
                    Credits
                </Highlighter>
                <NewGoal dispatcher={addCredit}/>
            </FlexContainerColumn>
            <List>
                {credits.map(c => <CreditItem key={c.id} credit={c}/>)}
            </List>
        </StyledCard>
    )
}
