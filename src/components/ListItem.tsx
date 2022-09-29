import {Goal} from "../models/Goal";
import React, {FormEvent, useState} from "react";
import styled from "styled-components";
import {useAppDispatch} from "../hooks/useStore";
import {putGoal, removeGoal, statusGoal, updateGoal} from "../store/goalsSlice";
import {GoalStatus} from "../enums/GoalStatus";
import {Icon} from "./Icon";
import {Icons} from "../models/Icon";
import {Input} from "./Input";
import {Price} from "./Price";

const ItemBody = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 20% 25% 30px;
  align-items: center;
  border-bottom: 1px solid ${({theme}) => theme.bgSecondary};
  padding: 7px 0;
  transition: all .3s;

  &:hover {
    background: ${({theme}) => theme.hover};
  }
`;

const StyledTitle = styled.span`
  padding-right: 10px;
`;

const Status: React.FC<Goal> = ({id, status}) => {
    const dispatch = useAppDispatch();
    const icons: Icons = {
        [GoalStatus.Open]: {color: '', icon: 'add'},
        [GoalStatus.Hot]: {color: 'orange', icon: 'flash_on'},
        [GoalStatus.Completed]: {color: 'green', icon: 'new_releases'},
    }

    const changeStatus = () => {
        const nextStatus = status + 1;
        dispatch(statusGoal({
            id,
            status: nextStatus >= (Object.keys(GoalStatus).length - 1) / 2 ? GoalStatus.Open : nextStatus,
        }))
    }

    return (
        <Icon
            onClick={changeStatus}
            icon={icons[status]?.icon}
            color={icons[status]?.color}
        />
    )
}

const Title: React.FC<Goal> = ({id, title: goalTitle}) => {
    const [title, setTitle] = useState(goalTitle);
    const dispatch = useAppDispatch();

    const changeTitle = (e: FormEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value;
        setTitle(title)
        dispatch(updateGoal({id, value: title, property: 'title'}))
    }

    return (
        <StyledTitle>
            <Input
                value={title}
                onChange={changeTitle}
                hideBorders={true}
                onEnterPress={() => dispatch(putGoal())}
            />
        </StyledTitle>
    )
}

const GoalPrice: React.FC<Goal> = ({id, price: goalPrice}) => {
    const [price, setPrice] = useState(goalPrice);
    const dispatch = useAppDispatch();

    const changePrice = (e: FormEvent<HTMLInputElement>) => {
        const price = +e.currentTarget.value;
        setPrice(price)
        dispatch(updateGoal({id, value: price, property: 'price'}))
    }

    return (
        <Price value={price}>
            <Input
                value={price}
                onChange={changePrice}
                maskCurrency={true}
                justifyRight={true}
                type={'number'}
                onEnterPress={() => dispatch(putGoal())}
            />
        </Price>
    )
}

const Delete: React.FC<Goal> = ({id}) => {
    const dispatch = useAppDispatch();

    return (
        <Icon
            onClick={() => dispatch(removeGoal(id))}
            icon={'delete_forever'}
            color={'red'}
        />
    )
}

type Props = {
    goal: Goal;
}

export const ListItem: React.FC<Props> = ({goal}) => {
    return (
        <ItemBody>
            <Status {...goal}/>
            <Title {...goal}/>
            <GoalPrice {...goal}/>
            <Price value={goal.price} useUAH={true}/>
            <Delete {...goal}/>
        </ItemBody>
    )
}
