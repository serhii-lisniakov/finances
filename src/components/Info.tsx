import React, {FormEvent, InputHTMLAttributes, useCallback, useEffect, useMemo} from "react";
import {Card, FlexContainer, FlexContainerColumn, Label} from "./components";
import {useAppDispatch, useAppSelector} from "../hook";
import {Input} from "./Input";
import {Price} from "./Price";
import {BalancesState, getBalances, saveBalances, updateBalances} from "../store/balancesSlice";
import Highlighter from "./Highlighter";
import styled from "styled-components";
import {Credits} from "./Credits";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 1em;
  gap: 1em;
`;

const StyledInfo = styled(FlexContainerColumn)`
  align-items: stretch;
  text-align: center;
`;

type ControlProps = {
        vertical?: boolean;
    }
    & React.ComponentProps<typeof Highlighter>
    & React.ComponentProps<typeof Price>
    & InputHTMLAttributes<HTMLInputElement>;

const Control: React.FC<ControlProps> = (props) => {
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
                onEnterPress={() => dispatch(saveBalances())}
            />
        </Price>
        <Price value={value} useUAH={!useUAH}/>
    </>)

    return (
        vertical ? <StyledInfo>{body()}</StyledInfo> : <FlexContainer>{body()}</FlexContainer>
    )
}

export const Info: React.FC = () => {
    const {income, invest, rest, bank, crypto, cash} = useAppSelector(state => state.balances);
    const credits = useAppSelector(state => state.credits);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBalances())
    }, [])

    const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
        const value = +e.currentTarget.value;
        const name = e.currentTarget.name as keyof BalancesState;
        dispatch(updateBalances({name, value}));
    }, [])

    const calcInvest = useMemo(() => +(income * invest/100).toFixed(), [invest, credits]);
    const calcCredits = useMemo(() => credits.reduce((sum, c) => sum + c.price, 0), [invest, credits]);
    const calcAcc = useMemo(() => +(income - calcInvest - calcCredits - rest).toFixed(), [invest, credits, rest]);

    return (
        <StyledCard corners={[25, 25, 0, 0]}>
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
                        onEnterPress={() => dispatch(saveBalances())}
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

            <Credits/>

            <FlexContainerColumn>
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
