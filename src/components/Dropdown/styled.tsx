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

export const ConOption = styled.div`
    height: 150px;
    overflow: auto;
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
    height: ${(props) => props.height} ;
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