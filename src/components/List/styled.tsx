import styled, {css} from 'styled-components';

import { Link } from 'react-router-dom'

export const breakpoints:any = {
    xs: '480px',
    sm: '768px',
    md: '992px',
    lg: '1200px'
};

export const respondTo = Object.keys(breakpoints).reduce(
    (accumulator:any, label:any) => {
        accumulator[label] = (...args:any) => css`
        @media (min-width: ${breakpoints[label]}) {
            ${css.apply(null, args)};
        }
        `;
        return accumulator;
    },
    {}
);

export const Container = styled.div`
    padding: 10px;
    display: grid;
    grid-template-columns: auto auto auto ;
    gap: 10px;
    ${respondTo.md`
        grid-template-columns: auto auto auto auto;
    `}
`
type ConListProps = {
    passages : string
}
export const ConList = styled(Link)<ConListProps>`
    background-color: ${( props: ConListProps) => props.passages === 'PL'? '#c7e5f7' : '#f0dbd0'};
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: black;
    height: 50px;
    border-radius: 10px;
    &:hover {
     background-color: ${(props: ConListProps) => props.passages === 'PL'? '#bae4fd' : '#f3ccb7'};
    }
`