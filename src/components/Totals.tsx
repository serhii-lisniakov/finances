import React from "react";
import {useAppSelector} from "../hook";
import {FlexContainer} from "./components";
import Highlighter from "./Highlighter";
import {Price} from "./Price";
import styled from "styled-components";
import {GoalStatus} from "../enums/GoalStatus";

const StyledTotals = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 0 1em 1em;

  > div {
    justify-content: center;
  }
`;

export const Totals: React.FC = () => {
    const {goals} = useAppSelector(state => state.goals);

    const total = goals
        .filter(g => g.status !== GoalStatus.Completed)
        .reduce((total, g) => total + g.price, 0);

    const hotTotal = goals
        .filter(g => g.status === GoalStatus.Hot)
        .reduce((total, g) => total + g.price, 0);

    return (
        <StyledTotals>
            <FlexContainer>
                <Highlighter bg={'hot'}>
                    <Price value={hotTotal} readOnly={true} isSum={true}/>
                </Highlighter>
                <Highlighter bg={'hot'}>
                    <Price value={total} useUAH={true} isSum={true}/>
                </Highlighter>
                <Highlighter bg={'hot'}>
                    1 month
                </Highlighter>
            </FlexContainer>
            <FlexContainer>
                <Highlighter>
                    <Price value={total} readOnly={true} isSum={true}/>
                </Highlighter>
                <Highlighter>
                    <Price value={total} useUAH={true} isSum={true}/>
                </Highlighter>
                <Highlighter>
                    77 months
                </Highlighter>
            </FlexContainer>
        </StyledTotals>
    )
}
