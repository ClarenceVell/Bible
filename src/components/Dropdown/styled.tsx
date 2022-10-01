import styled, {css} from 'styled-components';

export const breakpoints: any = {
    xs: '480px',
    sm: '768px',
    md: '992px',
    lg: '1200px'
};

export const respondTo = Object.keys(breakpoints).reduce(
    (accumulator: any, label: any) => {
        accumulator[label] = (...args: any) => css`
        @media (min-width: ${breakpoints[label]}) {
            ${css.apply(null, args)};
        }
        `;
        return accumulator;
    },
    {}
);

export const ConDropdown = styled.div`
    display: flex;
    gap: 15px;
    font-size: 16px;
`

export const Dropdownn = styled.div`
    display: flex;
    gap: 5px;
    padding: 8px 22px;
    align-items: center;
    background-color: rgba(233,238,238, 0.5);
`