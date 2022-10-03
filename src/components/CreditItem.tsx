import React, {FormEvent, useState} from "react";
import styled from "styled-components";
import {useAppDispatch} from "../hooks/useStore";
import {Icon} from "./Icon";
import {Input} from "./Input";
import {Price} from "./Price";
import {Credit, putCredit, removeCredit, updateCredit} from "../store/creditsSlice";

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
    const [title, setTitle] = useState(creditTitle);
    const dispatch = useAppDispatch();

    const changeTitle = (e: FormEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value;
        setTitle(title)
        dispatch(updateCredit({id, value: title, property: 'title'}))
    }

    return (
        <StyledTitle>
            <Input
                value={title}
                onChange={changeTitle}
                hideBorders={true}
                onEnterPress={() => dispatch(putCredit())}
            />
        </StyledTitle>
    )
}

const CreditPrice: React.FC<Credit> = ({id, price: creditPrice}) => {
    const [price, setPrice] = useState(creditPrice);
    const dispatch = useAppDispatch();

    const changePrice = (e: FormEvent<HTMLInputElement>) => {
        const price = +e.currentTarget.value;
        setPrice(price)
        dispatch(updateCredit({id, value: price, property: 'price'}))
    }

    return (
        <Price value={price}>
            <Input
                value={price}
                onChange={changePrice}
                maskCurrency={true}
                justifyRight={true}
                type={'number'}
                onEnterPress={() => dispatch(putCredit())}
            />
        </Price>
    )
}

const Delete: React.FC<Credit> = ({id}) => {
    const dispatch = useAppDispatch();

    return (
        <Icon
            onClick={() => dispatch(removeCredit(id))}
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
