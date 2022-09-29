import React, {memo, useState} from "react";
import {useAppDispatch} from "../hooks/useStore";
import {addGoal} from "../store/goalsSlice";
import styled from "styled-components";
import {Button} from "./Button";
import {Input} from "./Input";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

type Props = {}

const NewGoal: React.FC<Props> = () => {
    const [value, setValue] = useState<string>('');
    const dispatch = useAppDispatch();

    const add = () => {
        if (value?.trim()) {
            dispatch(addGoal(value));
            setValue('');
        }
    }

    return (
        <Wrapper>
            <Input
                placeholder='Add new goal...'
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                onEnterPress={add}
            />
            <Button onClick={add}>Add</Button>
        </Wrapper>
    )
}

export default memo(NewGoal);
