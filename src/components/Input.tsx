import styled, {css} from "styled-components";
import React, {InputHTMLAttributes, KeyboardEvent, useRef} from "react";
import {getFormattedPrice} from "../helpers/functions";

const mixin = css`
  padding: 4px 7px;
  background: none;
  width: 100%;
  color: inherit;
`;

const StyledInput = styled.input<{ justifyRight?: boolean }>`
  border-radius: 4px;
  border: none;
  outline: 1px solid ${({theme}) => theme.colorPrimary};
  outline-offset: 0;
  position: relative;
  letter-spacing: 0.3px;
  text-align: ${({justifyRight}) => justifyRight ? 'right' : 'left'};
  ${mixin};
  transition: all .3s;

  &:focus {
    background: ${({theme}) => theme.background};
  }
`;

const WithoutBorders = styled(StyledInput)`
  outline: none;

  &:focus {
    outline: 1px solid ${({theme}) => theme.colorPrimary};
  }
`;

const CurrencyWrapper = styled.span<{ readOnly?: boolean }>`
  position: relative;

  &:focus-within {
    :after {
      visibility: hidden;
    }
  }

  &:after {
    content: attr(data-value);
    position: absolute;
    text-align: right;
    height: 100%;
    left: 0;
    top: 0;
    pointer-events: none;
    ${mixin};
  }

  &:before {
    content: '';
    position: absolute;
    height: 0.5px;
    width: 20px;
    right: -21px;
    bottom: 9px;
    background: green;
    visibility: hidden;
  }

  ${({readOnly}) => readOnly ? css`
    pointer-events: none;
  ` : css`
    &:before {
      visibility: visible;
    }
  `}
`;

const Currency = styled(WithoutBorders)`
  color: transparent;
  letter-spacing: 0.75px;

  &:focus {
    color: inherit;
  }
`;

type Props = {
    hideBorders?: boolean;
    justifyRight?: boolean;
    onEnterPress?: Function;
    maskCurrency?: boolean;
}

export const Input: React.FC<Props & InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const ref = useRef<HTMLInputElement>(null)
    const {hideBorders, onEnterPress, maskCurrency, ...restProps} = props;

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            ref && ref.current?.blur();
            onEnterPress && onEnterPress();
        }
    };

    const nextProps = {
        ref,
        ...restProps,
        onKeyDown: handleEnter,
    }

    if (maskCurrency) {
        return (
            <CurrencyWrapper
                data-value={getFormattedPrice(props.value as number)}
                readOnly={props.readOnly}
            >
                <Currency {...nextProps}/>
            </CurrencyWrapper>
        )
    }

    return (
        hideBorders
            ? <WithoutBorders {...nextProps}/>
            : <StyledInput {...nextProps}/>
    )
}
