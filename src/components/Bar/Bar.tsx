import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { Nav, Side, NavRight, NavLeft, ConChapter, ConColor, ConFontSize, Font, ConSearch, InputSearch } from './styled'
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { SketchPicker, SliderPicker } from 'react-color';

import { useLocation } from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown';
import { useTranslation } from 'react-i18next';

interface BarProps {
  data: any[],
  chapter: any,
  language: any,
  setLanguage: any,
  bgColor: any,
  setBgColor: any,
  textColor:any,
  setTextColor: any,
  setTitleSize: any,
  setTextSize: any,
  handleSearch: any,
  passages: any,
  selectedPassage: any,
  setSelectedPassage: any,
  selectedChapter: any,
  totalChapter: any,
  width: number,
}

const Bar: React.FC<BarProps> = ({
  data,
  chapter, 
  language, setLanguage,
  bgColor,
  setBgColor,
  textColor,
  setTextColor,
  setTitleSize,
  setTextSize,
  handleSearch,
  passages,
  selectedPassage,
  setSelectedPassage,
  selectedChapter,
  totalChapter,
  width, 
}) => {
  const { t } = useTranslation()
  const location = useLocation()
  const [isSideBar, setIsSideBar] = useState<boolean>(false)
  const [insideData, setInsideData] = useState<any>()

  const handleChangeBg = (color:any) => {
    setBgColor(color.hex);
  };

  const handleChangeFont = (color:any) => {
    setTextColor(color.hex);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setInsideData(data[0])
    }
  }, [data])

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
                    <Link style={{ color: 'black'}} to={`/bible/${insideData?.abbreviation.replace(/\s/g, '')}/${parseInt(chapter)-1}`} >
                      <AiOutlineLeft  />
                    </Link>
                  )}
                  <p>{insideData?.book_name ? `${t(insideData?.book_name)} ${parseInt(chapter)}` : `${selectedPassage}: ${parseInt(chapter)}`}</p>
                  <Link style={parseInt(chapter) === insideData?.total_chapter ? {color: 'black', pointerEvents: 'none'} : { color: 'black'}} to={`/bible/${data[0]?.abbreviation.replace(/\s/g, '')}/${parseInt(chapter)+1}`}  >
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
            <select onChange={(e) => {setLanguage(e.target.value)}} value={language} style={{backgroundColor: 'transparent', padding:'5px 7px', border: 'none'}} name="language" id="">
              <option style={{border:'none'}} value="tb">Indonesia</option>
              <option style={{background:'transparent',border:'none'}} value="net">English</option>
            </select>

            {
              !location.pathname.includes('bible') || width <= 480? (
                <></>) : (
                <ConSearch>
                  <InputSearch type="text" placeholder='Search' onChange={handleSearch}/>
                  <ImSearch
                    style={{width: '20px', height:'20px'}} 
                  />
                </ConSearch>
                )
            }


          </NavLeft>
      </Nav>

      <Side isSidebar={isSideBar}>
        <IoMdClose
          onClick={() => setIsSideBar(!isSideBar)}
          style={{width: '25px', height:'25px', cursor:'pointer', fontSize: '16px'}} 
         />
        <p style={{fontSize: '25px', margin: '12px 0'}}>{t("tampilan")}</p>

        <ConColor>
          <div>
            <p className='font'>{t('warnaLatar')}:</p>
            <SketchPicker 
              width='90%'
              color={ bgColor }
              disableAlpha={true} 
              presetColors={[]} 
              onChange={handleChangeBg}
              onSwatchHover={handleChangeBg}
            />
          </div>
          <div>
            <p className='font'>{t('warnaText')}:</p>
            <SliderPicker color={textColor} onChange={handleChangeFont} />
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

        <Dropdown
          passages={passages}
          selectedPassage={selectedPassage} 
          setSelectedPassage={setSelectedPassage}
          selectedChapter={selectedChapter}
          totalChapter={totalChapter}
          width={width}
         />
        
      </Side>
    </>
  )
}

export default Bar