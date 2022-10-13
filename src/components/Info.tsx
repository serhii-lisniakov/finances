import React, {FormEvent, InputHTMLAttributes, useCallback, useEffect, useMemo} from "react";
import {Card, FlexContainer, FlexContainerColumn, Label} from "./components";
import {useAppDispatch, useAppSelector} from "../hook";
import {Input} from "./Input";
import {Price} from "./Price";
import {BalancesState, getBalances, saveBalances, updateBalances} from "../store/balancesSlice";
import Highlighter from "./Highlighter";
import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 1em;
  gap: 10px;
`;

const StyledInfoVertical = styled(FlexContainerColumn)`
  align-items: stretch;
  text-align: center;
  flex-grow: 1;
`;

const StyledInfo = styled(FlexContainer)`
  width: 100%;
  
  & > span:first-child {
    margin-right: auto;
  }
`;

type ControlProps = {
        vertical?: boolean;
    }
    & React.ComponentProps<typeof Highlighter>
    & React.ComponentProps<typeof Price>
    & InputHTMLAttributes<HTMLInputElement>;

const Control: React.FC<ControlProps> = (props) => {
    const [user] = useAuthState(auth);
    const dispatch = useAppDispatch();
    const {value, name, onChange, vertical, useUAH, bg, readOnly} = props;

    const body = () => (<>
        <Highlighter bg={bg}>
            <Label>{name}</Label>
        </Highlighter>
        <Price value={value as number} useUAH={useUAH}>
            <Input
                value={value}
                name={name}
                onChange={onChange}
                maskCurrency={true}
                justifyRight={true}
                readOnly={readOnly}
                type={'number'}
                onEnterPress={() => dispatch(saveBalances(user?.uid))}
            />
        </Price>
        <Price value={value} useUAH={!useUAH}/>
    </>)

    return (
        vertical
            ? <StyledInfoVertical>{body()}</StyledInfoVertical>
            : <StyledInfo>{body()}</StyledInfo>
    )
}

export const Info: React.FC = () => {
    const [user] = useAuthState(auth);
    const {income, invest, rest, bank, crypto, cash} = useAppSelector(state => state.balances);
    const credits = useAppSelector(state => state.credits);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBalances(user?.uid))
    }, [])

    const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
        const value = +e.currentTarget.value;
        const name = e.currentTarget.name as keyof BalancesState;
        dispatch(updateBalances({name, value}));
    }, [])

    const calcInvest = useMemo(() => +(income * invest / 100).toFixed(), [invest, credits]);
    const calcCredits = useMemo(() => credits.reduce((sum, c) => sum + c.price, 0), [invest, credits]);
    const calcAcc = useMemo(() => +(income - calcInvest - calcCredits - rest).toFixed(), [invest, credits, rest, income]);

    return (
        <StyledCard>
            <FlexContainerColumn>
                <Highlighter bg={'green'}>
                    <Control
                        name={'income'}
                        value={income}
                        onChange={handleChange}
                        bg={'green'}
                    />
                </Highlighter>
                <Highlighter bg={'green'}>
                    <Input
                        style={{flex: '40px'}}
                        value={invest}
                        name={'invest'}
                        onChange={handleChange}
                        hideBorders={true}
                        type={'number'}
                        onEnterPress={() => dispatch(saveBalances(user?.uid))}
                    />%
                    <Control
                        name={'invest'}
                        value={calcInvest}
                        onChange={handleChange}
                        readOnly={true}
                        bg={'green'}
                    />
                </Highlighter>
            </FlexContainerColumn>

            <FlexContainer>
                <Control
                    name={'credits'}
                    value={calcCredits}
                    onChange={handleChange}
                    vertical={true}
                    readOnly={true}
                    bg={'warn'}
                />
                <Control
                    name={'rest'}
                    value={rest}
                    onChange={handleChange}
                    vertical={true}
                    bg={'warn'}
                />
            </FlexContainer>

            <FlexContainerColumn>
                <Highlighter bg={'green'}>
                    <Control
                        name={'accumulate'}
                        value={calcAcc}
                        onChange={handleChange}
                        readOnly={true}
                        bg={'green'}
                    />
                </Highlighter>

                <FlexContainer>
                    <Control
                        name={'crypto'}
                        value={crypto}
                        onChange={handleChange}
                        vertical={true}
                        bg={'green'}
                    />
                    <Control
                        name={'cash'}
                        value={cash}
                        onChange={handleChange}
                        vertical={true}
                        bg={'green'}
                    />
                    <Control
                        name={'bank'}
                        value={bank}
                        onChange={handleChange}
                        vertical={true}
                        useUAH={true}
                        bg={'green'}
                    />
                </FlexContainer>
            </FlexContainerColumn>
        </StyledCard>
    )
}
