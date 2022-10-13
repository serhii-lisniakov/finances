import React, {memo, useState} from "react";
import {useAppDispatch} from "../hook";
import styled from "styled-components";
import {Button} from "./Button";
import {Input} from "./Input";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

type Props = {
    dispatcher: any;
}

const NewItem: React.FC<Props> = ({dispatcher}) => {
    const [user] = useAuthState(auth);
    const [value, setValue] = useState<string>('');
    const dispatch = useAppDispatch();

    const add = () => {
        if (value?.trim()) {
            dispatch(dispatcher({title: value, uid: user?.uid}));
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
                keepFocus={true}
            />
            <Button onClick={add}>Add</Button>
        </Wrapper>
    )
}

export default memo(NewItem);
