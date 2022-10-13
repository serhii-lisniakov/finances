import {Goal} from "../models/Goal";
import React, {FormEvent, useState} from "react";
import styled from "styled-components";
import {useAppDispatch} from "../hook";
import {changeGoal, removeGoal, updateGoal} from "../store/goalsSlice";
import {GoalStatus} from "../enums/GoalStatus";
import {Icon} from "./Icon";
import {Icons} from "../models/Icon";
import {Input} from "./Input";
import {Price} from "./Price";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";

const ItemBody = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 20% 25% 30px;
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

const Status: React.FC<Goal> = ({id, status}) => {
    const [user] = useAuthState(auth);
    const dispatch = useAppDispatch();
    const icons: Icons = {
        [GoalStatus.Open]: {color: '', icon: 'add'},
        [GoalStatus.Hot]: {color: 'orange', icon: 'flash_on'},
        [GoalStatus.Completed]: {color: 'green', icon: 'new_releases'},
    }

    const changeStatus = () => {
        const nextStatus = status + 1;
        const newStatus = nextStatus >= (Object.keys(GoalStatus).length - 1) / 2 ? GoalStatus.Open : nextStatus;
        dispatch(updateGoal({uid: user?.uid, id}))
        dispatch(changeGoal({id, value: newStatus, property: 'status'}))
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
    const [user] = useAuthState(auth);
    const [title, setTitle] = useState(goalTitle);
    const dispatch = useAppDispatch();

    const changeTitle = (e: FormEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value;
        setTitle(title)
        dispatch(changeGoal({id, value: title, property: 'title'}))
    }

    return (
        <StyledTitle>
            <Input
                value={title}
                onChange={changeTitle}
                hideBorders={true}
                onEnterPress={() => dispatch(updateGoal({uid: user?.uid, id}))}
            />
        </StyledTitle>
    )
}

const GoalPrice: React.FC<Goal> = ({id, price: goalPrice}) => {
    const [user] = useAuthState(auth);
    const [price, setPrice] = useState(goalPrice);
    const dispatch = useAppDispatch();

    const changePrice = (e: FormEvent<HTMLInputElement>) => {
        const price = +e.currentTarget.value;
        setPrice(price)
        dispatch(changeGoal({id, value: price, property: 'price'}))
    }

    return (
        <Price value={price}>
            <Input
                value={price}
                onChange={changePrice}
                maskCurrency={true}
                justifyRight={true}
                type={'number'}
                onEnterPress={() => dispatch(updateGoal({uid: user?.uid, id}))}
            />
        </Price>
    )
}

const Delete: React.FC<Goal> = ({id}) => {
    const [user] = useAuthState(auth);
    const dispatch = useAppDispatch();

    return (
        <Icon
            onClick={() => dispatch(removeGoal({id, uid: user?.uid}))}
            icon={'delete_forever'}
            color={'red'}
        />
    )
}

type Props = {
    goal: Goal;
}

export const GoalItem: React.FC<Props> = ({goal}) => {
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
