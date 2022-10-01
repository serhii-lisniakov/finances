import React from "react";
import {useAppSelector} from "../hooks/useStore";
import styled from "styled-components";
import {Card} from "./components";
import {getPriceInCurrency} from "../helpers/functions";

const Body = styled(Card)`
  background: #9d3171;
  font-size: 2em;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 1em;
`;

export const Total = () => {
    const {bank, cash} = useAppSelector(state => state.balances);
    const {price: currencyPrice} = useAppSelector(state => state.currency);

    return (
        <Body corners={[0, 0, 25, 25]}>
            ${+getPriceInCurrency(bank, currencyPrice).toFixed() + cash}
        </Body>
    )
}
