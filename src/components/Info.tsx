import React, {FormEvent, InputHTMLAttributes, useCallback, useEffect} from "react";
import {Card, FlexContainer} from "./components";
import {useAppDispatch, useAppSelector} from "../hooks/useStore";
import {Input} from "./Input";
import {Price} from "./Price";
import {BalancesState, getBalances, saveBalances, updateBalances} from "../store/balancesSlice";
import styled from "styled-components";

const StyledLabel = styled.label`
  text-transform: capitalize;
`;

type ControlProps = React.ComponentProps<typeof Price> & InputHTMLAttributes<HTMLInputElement>;

const Control: React.FC<ControlProps> = ({value, name, onChange, useUAH}) => {
    const dispatch = useAppDispatch();

    return (
        <FlexContainer>
            <StyledLabel>{name}</StyledLabel>
            <Price value={value as number} useUAH={useUAH}>
                <Input
                    value={value}
                    name={name}
                    onChange={onChange}
                    maskCurrency={true}
                    justifyRight={true}
                    type={'number'}
                    onEnterPress={() => dispatch(saveBalances())}
                />
            </Price>
        </FlexContainer>
    )
}

export const Info: React.FC = () => {
    const balances = useAppSelector(state => state.balances);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBalances())
    }, [])

    const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
        const value = +e.currentTarget.value;
        const name = e.currentTarget.name as keyof BalancesState;
        dispatch(updateBalances({name, value}));
    }, [balances])

    return (
        <Card corners={[25, 25, 0, 0]}>
            {Object.entries(balances).map(([key, value]) => (
                <Control
                    key={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    useUAH={true}
                />
            ))}
        </Card>
    )
}
