import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useStore";
import {ListItem} from "./ListItem";
import styled from "styled-components";
import NewGoal from "./NewGoal";
import {getGoals} from "../store/goalsSlice";
import {Card} from "./components";

const StyledList = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
`;

export const List = () => {
    const {goals} = useAppSelector(state => state.goals);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getGoals());
    }, [])

    return (
        <Card>
            <NewGoal/>
            <StyledList>
                {goals.map(g => (
                    <ListItem key={g.id} goal={g}/>
                ))}
            </StyledList>
        </Card>
    )
}
