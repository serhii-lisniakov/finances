import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useStore";
import {GoalItem} from "./GoalItem";
import styled from "styled-components";
import NewGoal from "./NewItem";
import {addGoal, getGoals} from "../store/goalsSlice";
import {Card, List} from "./components";
import {Totals} from "./Totals";

const StyledCard = styled(Card)`
  display: grid;
  grid-template: auto 1fr auto / 1fr;
  
  > div:first-child {
    padding: 1em 1em 0;
  }
`;

export const Goals: React.FC = () => {
    const {goals} = useAppSelector(state => state.goals);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getGoals());
    }, [])

    return (
        <StyledCard>
            <NewGoal dispatcher={addGoal}/>
            <List>
                {goals.map(g => <GoalItem key={g.id} goal={g}/>)}
            </List>
            <Totals/>
        </StyledCard>
    )
}
