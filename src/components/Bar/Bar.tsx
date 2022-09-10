import React, {useState} from 'react'
import Logo from '../Logo/Logo'
import { Nav, Side, NavRight, NavLeft } from './styled'
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';

function Bar() {
  const [isSideBar, setIsSideBar] = useState(false)
  return (
    <>
      <Nav>
        <NavRight>
          <FaBars 
            onClick={() => setIsSideBar(!isSideBar)}
            style={{width: '25px', height:'25px', cursor:'pointer'}} 
          />
          <div>
            <Logo />
          </div>
        </NavRight>

          <NavLeft>
            <ImSearch
              style={{width: '22px', height:'22px'}} 
            />
          </NavLeft>
      </Nav>

      <Side isSidebar={isSideBar}>
        <IoMdClose
          onClick={() => setIsSideBar(!isSideBar)}
          style={{width: '25px', height:'25px', cursor:'pointer'}} 
         />
        
      </Side>
    </>
  )
}

export default Bar