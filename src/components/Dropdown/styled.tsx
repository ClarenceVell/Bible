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

interface DropProperties {
    isMobile: boolean
}
export const ConDropdown = styled.div<DropProperties>`
    display: flex;
    gap: 15px;
    font-size: 16px;
    flex-direction: ${({ isMobile }) => isMobile ? 'column': 'row'};
    
    &>*:not(:nth-child(2)){
        // color: red;
    }
`

export const Dropdownn = styled.div`
    display: flex;
    gap: 5px;
    padding: 8px 22px;
    align-items: center;
    background-color: rgba(233,238,238, 0.5);
`

export const ConOption = styled.div`
    display: block;
    // top: 30px;
    // left: -30px;
    height: 150px;
    overflow: auto;
    z-index: 10;
`

type OptionUnlistProps = {
    height: string
}

export const OptionUnlist:any = styled.ul<OptionUnlistProps>`
    padding: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    overflow: auto; 
    margin: 5px;
    height: auto;

    ${respondTo.md`
        height: ${(props:any) => props.height};
    `}
`

export const OptionList= styled.li`
    list-style-type: none;
    font-size: 16px;
    padding: 5px;
    cursor: pointer;
`

export const Icon = styled.div`
    padding: 5px;
    width: 11px;
    // color: #8ab4f8;
`