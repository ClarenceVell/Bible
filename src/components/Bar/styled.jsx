import styled, {css} from 'styled-components';

export const breakpoints = {
    xs: '480px',
    sm: '768px',
    md: '992px',
    lg: '1200px'
};

export const respondTo = Object.keys(breakpoints).reduce(
    (accumulator, label) => {
        accumulator[label] = (...args) => css`
        @media (min-width: ${breakpoints[label]}) {
            ${css(...args)};
        }
        `;
        return accumulator;
    },
    {}
);

export const Nav = styled.nav`
    height: 70px;
    width: 100%;
    background-color: #acaeb3;
    position: fixed;
    display: flex;
    align-items: center;
    padding: 0 18px;
`
export const NavRight = styled.div`
    display: flex;
    align-items: center;
    gap: 50px;
`

export const NavLeft = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`

export const Side = styled.div`
    width: 45%;
    height: 100vh;
    background-color: #acaeb3;
    z-index: 1000;
    transition: 350ms;
    position: fixed;
    top: 0;
    left: ${({ isSidebar }) => (isSidebar ? '0' : '-100%')};
    padding: 15px 15px;
    ${respondTo.md`
        width: 30%;
    `}
`