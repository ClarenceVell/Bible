import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
// import React, {useState, useEffect} from 'react'
// import Bible from './components/Bible';
import Home from './pages/Home';
import Content from './pages/Content';
import Bar from './components/Bar/Bar';
import { GlobalStyle } from './globalStyled';

// import { createGlobalStyle } from 'styled-components';

const App = () => {

  const location = useLocation()
  const [passages, setPassages] = useState<any[]>([])
  const [selectedPassage, setSelectedPassage] = useState<string>('')
  const [chapter, setChapter] = useState<any>(1)
  const [content, setContent] = useState<any>()
  const [language, setLanguage] = useState<any>('tb')
  const [selectedAbre, setSelectedAbre] = useState<string>('')
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [bgColor, setBgColor] = useState<any>('white')
  const [textColor, setTextColor] = useState<any>('black')
  const [titleSize, setTitleSize] = useState<any>('23px')
  const [textSize, setTextSize] = useState<any>('16px')

  const [resultSearch, setResultSearch] = useState<any>(content?.verse)
  
  const [paths, setPaths] = useState<string[]>()

  
  useEffect(() => {
    if (location?.pathname) {
      setPaths(location?.pathname?.split('/'))
      setChapter(location?.pathname?.split('/')[3])
    }
    fetch(
      `${process.env.REACT_APP_BIBLE_PASSAGE_LIST}`
    )
      .then(response => response.json())
      .then(data => {
        console.log({ data })
          setPassages(data.passage_list)
      })
      .catch(error => {
        console.log(error)
      })
  }, [location?.pathname])


  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      setSelectedAbre(filteredData[0].abbreviation)
    }
  }, [filteredData])

  useEffect(() => {
    console.log('test')
    if (paths && paths.length > 0 && passages.length > 0) {
      setSelectedPassage(paths[2])
      const data = passages.filter((d: any) => {
        return paths[2]===d.abbreviation
      })
      setFilteredData(data)
    }
  }, [paths, passages])

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      fetch(
        `${process.env.REACT_APP_BIBLE_URL_V3 + `${filteredData[0].abbreviation}/${chapter}?ver=${language}`}`
      )
      .then(Response => Response.json())
      .then(data => {
        setContent(data)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }, [chapter, filteredData, language])

  // useEffect(() => {
  //   setResultSearch(content?.verse)
  // }, [content])

  const handleSearch = (e:any) => {
    console.log('val')
    let search 
    if(e.target.value){
      // console.log(content.verses)
      console.log(e.target.value)
      search = content?.verses?.filter(
        (item:any) => item.content.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setResultSearch(search)
    } else {
      console.log('haiiiiiiiiiiiii', content?.verse)
      setResultSearch(content?.verse)
    }
    // e.target.value = ''
  }
  console.log(resultSearch, 'result')
  console.log(language, 'language')
  console.log(filteredData, 'filteredData')

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
        setBgColor={setBgColor}
        setTextColor={setTextColor}
        setLanguage={setLanguage} 
        language={language}
        setTitleSize={setTitleSize}
        setTextSize={setTextSize}
        handleSearch={handleSearch}
      />
      <Routes>
        <Route path='/' element={<Home passages={passages} chapter={chapter} setChapter={setChapter}/>} />
        <Route path='/bible/:passage/:chapter' 
          element={
            <Content 
              data={filteredData} 
              content={content} 
              resultSearch={resultSearch}
              textColor={textColor}
              titleSize={titleSize}
              textSize={textSize}
            />
          } 
        />
      </Routes>
    </>
  );
}

export default App;
