import { createGlobalStyle } from 'styled-components';

type GlobalStyleProps = {
    bg: string,
    color: string,
    fs: string
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    background-color: ${(props: GlobalStyleProps) => props.bg};
    color: ${(props: GlobalStyleProps) => props.color};
    font-size: ${(props: GlobalStyleProps) => props.fs};
  }
  `