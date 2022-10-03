import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hook";
import NewGoal from "./NewItem";
import {FlexContainerColumn, List} from "./components";
import {addCredit, getCredits} from "../store/creditsSlice";
import Highlighter from "./Highlighter";
import styled from "styled-components";
import {CreditItem} from "./CreditItem";

const Container = styled(FlexContainerColumn)`
  align-items: stretch;
  margin-bottom: auto;
  padding-left: 1px;
  overflow: auto;
`;

const StyledList = styled(List)`
  margin: 0;
`;

export const Credits: React.FC = () => {
    const credits = useAppSelector(state => state.credits);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCredits());
    }, [])

    return (
        <Container>
            <Highlighter bg={'warn'}>
                Credits
            </Highlighter>
            <NewGoal dispatcher={addCredit}/>
            <StyledList>
                {credits.map(c => <CreditItem key={c.id} credit={c}/>)}
            </StyledList>
        </Container>
    )
}
