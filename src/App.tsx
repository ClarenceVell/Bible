import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Content from './pages/Content';
import Bar from './components/Bar/Bar';
import { GlobalStyle } from './globalStyled';
import { useTranslation } from 'react-i18next';

const App = () => {

  const location = useLocation()
  const { i18n} = useTranslation()
  const changeLanguage = useCallback((lang: string) => {
    i18n.changeLanguage(lang);
  }, [i18n])
  const [passages, setPassages] = useState<any[]>([])
  const [selectedPassage, setSelectedPassage] = useState<any>()
  const [selectedChapter, setSelectedChapter] = useState<any>()
  const [totalChapter, setTotalChapter] = useState<any>()
  const [chapter, setChapter] = useState<any>(1)
  const [content, setContent] = useState<any>()
  const [language, setLanguage] = useState<any>(localStorage.getItem('lang') || 'tb')
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [bgColor, setBgColor] = useState<any>('#fff')
  const [textColor, setTextColor] = useState<any>('#000')
  const [titleSize, setTitleSize] = useState<any>('23px')
  const [textSize, setTextSize] = useState<any>('16px')

  const [resultSearch, setResultSearch] = useState<any>(content?.verse)
  
  const [paths, setPaths] = useState<string[]>()
  const [keyword, setKeyword] = useState<string>('')
  const [dimension, setDimension] = useState<{
    width: number,
    height: number,
  }>({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const [loading, setLoading] = useState<boolean>(false)

  const resize = () => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    if (language && language !== '') {
      changeLanguage(language === 'tb' ? 'id' : 'en')
    }
  }, [changeLanguage, language])

  useEffect(() => {
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => {
    
    localStorage.setItem('lang', language)

  }, [language, selectedPassage, totalChapter])


  useEffect(() => {
    if (location?.pathname) {
      setPaths(location?.pathname?.split('/'))
      setChapter(location?.pathname?.split('/')[3])
      setSelectedChapter(location?.pathname?.split('/')[3])
    }
    setLoading(true)
    fetch(
      `${process.env.REACT_APP_BIBLE_PASSAGE_LIST}`
    )
      .then(response => response.json())
      .then(data => {
          setPassages(data.passage_list)
          setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }, [location])


  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      setSelectedPassage(filteredData[0].abbreviation.replace(/\s/g, ''))
    }
  }, [filteredData])

  useEffect(() => {
    if (paths && paths.length > 0 && passages.length > 0) {
      const data = passages.filter((d: any) => {
        return paths[2]===d.abbreviation.replace(/\s/g, '')
      })
      setFilteredData(data)
      setTotalChapter(data[0]?.total_chapter || 0)
    }
  }, [paths, passages])

  const handleSearch = (e:any) => {
    let search 
    if(e.target.value){
      setKeyword(e.target.value)
      search = content?.verses?.filter(
        (item:any) => item.content.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setResultSearch(search)
    } else {
      setResultSearch(content?.verses)
    }
  }

  useEffect(() => {
    const lang = localStorage.getItem('lang')
    if (filteredData && filteredData.length > 0) {
      setLoading(true)
      fetch(
        `${process.env.REACT_APP_BIBLE_URL_V3 + `${filteredData[0].abbreviation.replace(/\s/g, '')}/${chapter}?ver=${lang}`}`
      )
      .then(Response => Response.json())
      .then(data => {
        setContent(data)
        const search = data?.verses?.filter(
          (item:any) => item.content.toLowerCase().includes(keyword.toLowerCase())
        )
        setResultSearch(search)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
    }
  }, [chapter, filteredData, keyword, language])

  return (
    <>
      <GlobalStyle 
        bg={bgColor} 
        color={textColor} 
        fs={textSize} 
      />
      <Bar 
        data={filteredData} 
        chapter={chapter}
        passages={passages}
        bgColor={bgColor}
        setBgColor={setBgColor}
        textColor={textColor}
        setTextColor={setTextColor}
        setLanguage={setLanguage} 
        language={language}
        setTitleSize={setTitleSize}
        setTextSize={setTextSize}
        handleSearch={handleSearch}
        selectedPassage={selectedPassage} 
        setSelectedPassage={setSelectedPassage}
        selectedChapter={selectedChapter}
        totalChapter={totalChapter}
        width={dimension?.width || 0} 
      />
      <Routes>
        <Route path='/' 
        element={
          <Home 
            passages={passages} 
            chapter={chapter} 
            setChapter={setChapter}
          />
        } 
        />
        <Route path='/bible/:passage/:chapter' 
          element={
            <Content 
              loading={loading}
              resultSearch={resultSearch}
              textColor={textColor}
              titleSize={titleSize}
              textSize={textSize}
              language={language}
            />
          } 
        />
      </Routes>
    </>
  );
}

export default App;
