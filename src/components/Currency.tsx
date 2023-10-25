import React, {memo, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hook";
import {getCurrency} from "../store/currencySlice";
import {Button} from "devextreme-react/button";

type Props = {};

const Currency: React.FC<Props> = () => {
    const {currency, price} = useAppSelector((state) => state.currency);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrency());
    }, [dispatch]);

    return (
        <Button>
            1 {currency} = {+price.toFixed(2)} UAH
        </Button>
    );
};

export default memo(Currency);
