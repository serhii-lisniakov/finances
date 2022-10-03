import React, {memo, useState} from "react";
import {useAppDispatch} from "../hook";
import styled from "styled-components";
import {Button} from "./Button";
import {Input} from "./Input";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

type Props = {
    dispatcher: any;
}

const NewItem: React.FC<Props> = ({dispatcher}) => {
    const [value, setValue] = useState<string>('');
    const dispatch = useAppDispatch();

    const add = () => {
        if (value?.trim()) {
            dispatch(dispatcher(value));
            setValue('');
        }
    }

    return (
        <Wrapper>
            <Input
                placeholder='Add new...'
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                onEnterPress={add}
            />
            <Button onClick={add}>Add</Button>
        </Wrapper>
    )
}

export default memo(NewItem);
