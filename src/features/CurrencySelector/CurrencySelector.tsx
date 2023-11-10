import React, {memo, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hook";
import {getCurrency} from "./store";
import {Button} from "devextreme-react/button";

type Props = {};

const CurrencySelector: React.FC<Props> = () => {
    const {price} = useAppSelector((state) => state.currency);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrency());
    }, [dispatch]);

    return <Button>{+price.toFixed(2)} UAH</Button>;
};

export default memo(CurrencySelector);
