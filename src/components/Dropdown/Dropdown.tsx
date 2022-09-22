import React from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import { ConDropdown, Dropdownn } from './styled'

const Dropdown = () => {
  return (
    <ConDropdown>
        <Dropdownn>
            <p>Kejadian</p>
            <AiFillCaretDown style={{fontSize: '14px'}} />
        </Dropdownn>
        <div>
            
        </div>

        <Dropdownn>
            <p>2</p>
            <AiFillCaretDown style={{fontSize: '14px'}} />
        </Dropdownn>
    </ConDropdown>
  )
}

export default Dropdown