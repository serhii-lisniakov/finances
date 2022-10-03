import React, {PropsWithChildren} from "react";
import {useAppSelector} from "../hook";
import styled from "styled-components";
import {getFormattedPrice, getPriceInCurrency, getPriceInUAH} from "../helpers/functions";

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
  color: ${({theme}) => theme.currency};
`;

type Props = {
    value: number;
    useUAH?: boolean;
    readOnly?: boolean;
    isSum?: boolean;
}

export const Price: React.FC<Props & PropsWithChildren> = (props) => {
    const {value, children, useUAH, readOnly, isSum} = props;
    const {currency: appCurrency, price: currencyPrice} = useAppSelector(state => state.currency);

    const getValue = () => {
        const isUAH = useUAH ? getPriceInUAH(value, currencyPrice) : getPriceInCurrency(value, currencyPrice);
        return getFormattedPrice(readOnly ? +value : +isUAH);
    }

    return (
        <StyledPrice>
            {isSum && <StyledCurrency style={{margin: '0 3px 0 0'}}>Σ</StyledCurrency>}
            {children ? children : getValue()}
            <StyledCurrency>{useUAH ? 'UAH' : appCurrency}</StyledCurrency>
        </StyledPrice>
    )
}
