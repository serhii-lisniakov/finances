import styled, {css} from "styled-components";

export const Card = styled.div<{ corners?: number[] }>`
  border-radius: 25px;
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  background: ${({theme}) => theme.bgPrimary};
  ${({corners}) => css`
    border-top-left-radius: ${corners ? corners[0] : 25}px;
    border-top-right-radius: ${corners ? corners[1] : 25}px;
    border-bottom-right-radius: ${corners ? corners[2] : 25}px;
    border-bottom-left-radius: ${corners ? corners[3] : 25}px;
  `};
  overflow: hidden;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: stretch;
`;

export const FlexContainerColumn = styled(FlexContainer)`
  flex-direction: column;
  align-items: stretch;
`;

export const Label = styled.label`
  text-transform: capitalize;
`;

export const List = styled.div`
  margin: 1em 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
