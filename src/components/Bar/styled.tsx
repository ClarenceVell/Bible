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

export const Nav = styled.nav`
    height: 70px;
    width: 100%;
    background-color: #d1d5db;
    position: fixed;
    color: black;
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
    align-items: center;
    gap: 15px;
    justify-content: flex-end;
    width: 100%;
`

type SideProps = {
    isSidebar: boolean
}

export const Side:any = styled.div<SideProps>`
    width: 45%;
    height: 100vh;
    background-color: #d1d5db;
    z-index: 1000;
    color: black;
    transition: 350ms;
    position: fixed;
    overflow-x: auto;
    top: 0;
    left: ${( { isSidebar } ) => isSidebar ? '0' : '-100%'};
    padding: 15px 15px;
    ${respondTo.md`
        width: 30%;
    `}
`

export const ConChapter = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    gap: 5px;
    min-width: 200px;

    ${respondTo.md`
        font-size: 20px;
        gap: 18px;
        min-width: 220px;
    `}
`

export const ConColor = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    cursor: pointer;

    .font{
        margin-bottom: 5px;
        font-size: 16px;
    }
`

export const ConFontSize = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 30px 0;
`
type FontProps = {
    FS: any,
    padding: string
}

export const Font:any = styled.div<FontProps>`
    border: 2px solid black;
    padding: ${( {padding} ) => padding};
    border-radius: 50%;
    font-weight: bold;
    cursor: pointer;
    font-size: ${( {FS} ) => FS}
`

export const InputSearch = styled.input`
    width: 0;
    transition: 0.8s;
    outline: none;
    border: none;
    background: transparent;
`

export const ConSearch = styled.div`
    height: 30px;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    &:hover ${InputSearch}{
        width: 200px;
    }
`