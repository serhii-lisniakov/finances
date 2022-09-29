import React, {PropsWithChildren} from "react";
import {useAppSelector} from "../hooks/useStore";
import styled from "styled-components";
import {getFormattedPrice, getPriceInUAH} from "../helpers/functions";

const StyledPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
  
  > :first-child {
    margin-left: 7px;
  }
`;

const StyledCurrency = styled.span`
  font-size: 0.75em;
  text-align: right;
  position: relative;
  top: -2px;
  color: #878787;
`;

type Props = {
    value: number;
    useUAH?: boolean;
}

export const Price: React.FC<Props & PropsWithChildren> = ({value, children, useUAH}) => {
    const {currency: appCurrency} = useAppSelector(state => state.currency);
    const {price: currencyPrice} = useAppSelector(state => state.currency);

    return (
        <StyledPrice>
            {children
                ? children
                : getFormattedPrice(getPriceInUAH(value, currencyPrice))
            }
            <StyledCurrency>{useUAH ? 'UAH' : appCurrency}</StyledCurrency>
        </StyledPrice>
    )
}
