import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useStore";
import NewGoal from "./NewItem";
import {FlexContainerColumn, List} from "./components";
import {addCredit, Credit, getCredits} from "../store/creditsSlice";
import Highlighter from "./Highlighter";
import styled from "styled-components";

const Container = styled(FlexContainerColumn)`
  align-items: stretch;
  margin-bottom: auto;
  padding-left: 1px;
  overflow: auto;
`;

const StyledList = styled(List)`
  margin-top: 0;
`;

const CreditItem: React.FC<Credit> = (props) => {
    return <span>{props.title}</span>
}

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
                {credits.map(c => <CreditItem key={c.id} {...c}/>)}
            </StyledList>
        </Container>
    )
}
