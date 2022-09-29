import React from "react";
import {useAppSelector} from "../hooks/useStore";
import styled from "styled-components";
import {Card} from "./components";

const Body = styled(Card)`
  background: #9d3171;
  font-size: 2em;
  font-weight: bold;
  color: white;
  text-align: center;
`;

export const Total = () => {
    const {bank, cash} = useAppSelector(state => state.balances);

    return (
        <Body corners={[0, 0, 25, 25]}>
            ${bank + cash}
        </Body>
    )
}
