import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { Nav, Side, NavRight, NavLeft, ConChapter, ConColor, ConFontSize, Font, ConSearch, InputSearch } from './styled'
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { useLocation } from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown';

interface BarProps {
  data: any[],
  chapter: any,
  language: any,
  setLanguage: any,
  setBgColor: any,
  setTextColor: any,
  setTitleSize: any,
  setTextSize: any,
  handleSearch: any
}

const Bar: React.FC<BarProps> = ({
  data,
  chapter, 
  language, setLanguage,
  setBgColor,
  setTextColor,
  setTitleSize,
  setTextSize,
  handleSearch
}) => {
  const location = useLocation()
  const [isSideBar, setIsSideBar] = useState<boolean>(false)


  return (
    <>
      <Nav>
        <NavRight>
          <FaBars 
            onClick={() => setIsSideBar(!isSideBar)}
            style={
              !location.pathname.includes('bible') ? {display: 'none'}
             : {width: '25px', height:'25px', cursor:'pointer' }
            }
          />
          <div>
            {location.pathname.includes('bible') ? (
              <>
                <ConChapter >
                  {parseInt(chapter) === 1 ? (
                    <AiOutlineLeft style={{color: 'black'}}  />
                  ): (
                    <Link style={{ color: 'black'}} to={`/bible/${data[0]?.abbreviation}/${parseInt(chapter)-1}`} >
                      <AiOutlineLeft  />
                    </Link>
                  )}
                  <p>{data[0]?.book_name ? `${data[0]?.book_name} ${parseInt(chapter)}` : '-'}</p>
                  <Link style={parseInt(chapter) === data[0]?.total_chapter ? {color: 'black', pointerEvents: 'none'} : { color: 'black'}} to={`/bible/${data[0]?.abbreviation}/${parseInt(chapter)+1}`}  >
                    <AiOutlineRight />
                  </Link>
                </ConChapter>
              </>
            ) : 
              <Logo />
            }
          </div>
        </NavRight>

          <NavLeft>
            {/* <label htmlFor="language">{language}</label> */}
            <select onChange={(e) => {setLanguage(e.target.value)}} style={{backgroundColor: 'transparent', padding:'5px 7px', border: 'none'}} name="language" id="">
              <option style={{background:'transparent',border:'none'}} value="net">English</option>
              <option style={{border:'none'}} value="tb">Indonesia</option>
            </select>

            <ConSearch>
              <InputSearch type="text" placeholder='Search' onChange={handleSearch}/>
              <ImSearch
                style={{width: '20px', height:'20px'}} 
              />
            </ConSearch>

          </NavLeft>
      </Nav>

      <Side isSidebar={isSideBar}>
        <IoMdClose
          onClick={() => setIsSideBar(!isSideBar)}
          style={{width: '25px', height:'25px', cursor:'pointer', fontSize: '16px'}} 
         />
        <p style={{fontSize: '20px', margin: '12px 0'}}>Tampilan</p>
        <ConColor>
          <div 
            onClick={() => {
              setBgColor('black')
              setTextColor('white')
            }}
            style={{height: '42px', backgroundColor: 'black'}}
          >
          </div>
          <div 
            onClick={() => {
              setBgColor('white')
              setTextColor('black')
            }}
            style={{height: '42px', backgroundColor: 'white'}}
          >
          </div>
          <div 
            onClick={() => {
              setBgColor('#bdd5d0')
              setTextColor('black')
            }}
            style={{height: '42px', backgroundColor: '#bdd5d0'}}
          >
          </div>
          <div 
            onClick={() => {
              setBgColor('#926446')
              setTextColor('white')
            }}
            style={{height: '42px', backgroundColor: '#926446'}}
          >
          </div>
        </ConColor>

        <ConFontSize>
          <Font onClick={() => {
            setTitleSize('22px')
            setTextSize('16px')
          }} FS='16px' padding='12px 13px'>A</Font>
          <Font onClick={() => {
            setTitleSize('24px')
            setTextSize('20px')
          }} FS='20px' padding='10px 14px'>A</Font>
          <Font onClick={() => {
            setTitleSize('30px')
            setTextSize('25px')
          }} FS='25px' padding='8px 15px'>A</Font>
        </ConFontSize>

        <Dropdown />
        
      </Side>
    </>
  )
}

export default Bar