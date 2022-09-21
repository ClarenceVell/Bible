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
        // console.log(paths)
        // setChapter(paths[3])
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

  console.log(language, 'language')

  return (
    <>
      <GlobalStyle bg={bgColor} color={textColor} />
      <Bar 
        data={filteredData} 
        chapter={chapter}
        bgColor={bgColor} setBgColor={setBgColor}
        textColor={textColor} setTextColor={setTextColor}
        setLanguage={setLanguage} language={language}
      />
      <Routes>
        <Route path='/' element={<Home passages={passages} chapter={chapter} setChapter={setChapter}/>} />
        <Route path='/bible/:passage/:chapter' 
          element={
            <Content data={filteredData} content={content} textColor={textColor}/>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
