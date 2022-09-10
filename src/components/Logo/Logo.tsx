import React from 'react'
import { Container, LogoText } from './styled'

function Logo() {
  return (
    <Container >
        <img src="./assets/icons/book.png" height={25} width={25} alt="" />
        <LogoText>Alkitabku</LogoText>
    </Container>
  )
}

export default Logo