import React, {FormEvent, useState} from "react";
import styled from "styled-components";
import {useAppDispatch} from "../hook";
import {Icon} from "./Icon";
import {Input} from "./Input";
import {Price} from "./Price";
import {changeCredit, removeCredit, updateCredit} from "../store/creditsSlice";
import {Credit} from "../models/Credit";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";

const ItemBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 20% 25% 30px;
  align-items: center;
  border-bottom: 1px solid ${({theme}) => theme.bgSecondary};
  padding: 2px 4px;
  transition: all .3s;

  &:hover {
    background: ${({theme}) => theme.hover};
  }
`;

const StyledTitle = styled.span`
  padding-right: 10px;
`;

const Title: React.FC<Credit> = ({id, title: creditTitle}) => {
    const [user] = useAuthState(auth);
    const [title, setTitle] = useState(creditTitle);
    const dispatch = useAppDispatch();

    const changeTitle = (e: FormEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value;
        setTitle(title)
        dispatch(changeCredit({id, value: title, property: 'title'}))
    }

    return (
        <StyledTitle>
            <Input
                value={title}
                onChange={changeTitle}
                hideBorders={true}
                onEnterPress={() => dispatch(updateCredit({uid: user?.uid, id}))}
            />
        </StyledTitle>
    )
}

const CreditPrice: React.FC<Credit> = ({id, price: creditPrice}) => {
    const [user] = useAuthState(auth);
    const [price, setPrice] = useState(creditPrice);
    const dispatch = useAppDispatch();

    const changePrice = (e: FormEvent<HTMLInputElement>) => {
        const price = +e.currentTarget.value;
        setPrice(price)
        dispatch(changeCredit({id, value: price, property: 'price'}))
    }

    return (
        <Price value={price}>
            <Input
                value={price}
                onChange={changePrice}
                maskCurrency={true}
                justifyRight={true}
                type={'number'}
                onEnterPress={() => dispatch(updateCredit({uid: user?.uid, id}))}
            />
        </Price>
    )
}

const Delete: React.FC<Credit> = ({id}) => {
    const [user] = useAuthState(auth);
    const dispatch = useAppDispatch();

    return (
        <Icon
            onClick={() => dispatch(removeCredit({id, uid: user?.uid}))}
            icon={'delete_forever'}
            color={'red'}
        />
    )
}

type Props = {
    credit: Credit;
}

export const CreditItem: React.FC<Props> = ({credit}) => {
    return (
        <ItemBody>
            <Title {...credit}/>
            <CreditPrice {...credit}/>
            <Price value={credit.price} useUAH={true}/>
            <Delete {...credit}/>
        </ItemBody>
    )
}
