import React, {memo, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/useStore";
import {getCurrency} from "../store/currencySlice";
import Highlighter from "./Highlighter";

type Props = {}

const Currency: React.FC<Props> = () => {
    const {currency, price} = useAppSelector(state => state.currency)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrency());
    }, [dispatch])

    return (
        <Highlighter bg={'accent'}>
            1 {currency} = {+price.toFixed(2)} UAH
        </Highlighter>
    )
}

export default memo(Currency);
