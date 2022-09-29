import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Content from './pages/Content';
import Bar from './components/Bar/Bar';
import { GlobalStyle } from './globalStyled';

const App = () => {

  const location = useLocation()
  const [passages, setPassages] = useState<any[]>([])
  const [selectedPassage, setSelectedPassage] = useState<any>()
  const [selectedChapter, setSelectedChapter] = useState<any>()
  const [totalChapter, setTotalChapter] = useState<any>()
  const [chapter, setChapter] = useState<any>(1)
  const [content, setContent] = useState<any>()
  const [language, setLanguage] = useState<any>(localStorage.getItem('lang') || 'tb')
  const [selectedAbre, setSelectedAbre] = useState<string>('')
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [bgColor, setBgColor] = useState<any>('white')
  const [textColor, setTextColor] = useState<any>('black')
  const [titleSize, setTitleSize] = useState<any>('23px')
  const [textSize, setTextSize] = useState<any>('16px')

  const [resultSearch, setResultSearch] = useState<any>(content?.verse)
  
  const [paths, setPaths] = useState<string[]>()
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    
    localStorage.setItem('lang', language)
    // localStorage.setItem('passage', selectedPassage)
    // localStorage.setItem('totalChap', totalChapter)

  }, [language, selectedPassage, totalChapter])


  useEffect(() => {
    console.log({ location })
    if (location?.pathname) {
      setPaths(location?.pathname?.split('/'))
      setChapter(location?.pathname?.split('/')[3])
      setSelectedChapter(location?.pathname?.split('/')[3])
    }
    fetch(
      `${process.env.REACT_APP_BIBLE_PASSAGE_LIST}`
    )
      .then(response => response.json())
      .then(data => {
        // console.log({ data })
        console.log(data, 'DaATAAAAAAAAAAAAAAA')
          setPassages(data.passage_list)
      })
      .catch(error => {
        console.log(error)
      })
  }, [location])


  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      setSelectedAbre(filteredData[0].abbreviation)
      setSelectedPassage(filteredData[0].abbreviation)
    }
  }, [filteredData])

  useEffect(() => {
    // console.log('test')
    if (paths && paths.length > 0 && passages.length > 0) {
      console.log({ passages })
      console.log({ paths })
      const data = passages.filter((d: any) => {
        return paths[2]===d.abbreviation
      })
      setFilteredData(data)
      console.log({data})
      // setSelectedPassage(data.book_name)
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
    // e.target.value = ''
  }

  useEffect(() => {
    const lang = localStorage.getItem('lang')
    if (filteredData && filteredData.length > 0) {
      fetch(
        `${process.env.REACT_APP_BIBLE_URL_V3 + `${filteredData[0].abbreviation}/${chapter}?ver=${lang}`}`
      )
      .then(Response => Response.json())
      .then(data => {
        setContent(data)
        // console.log(data, 'DaATAAAAAAAAAAAAAAA')
        const search = data?.verses?.filter(
          (item:any) => item.content.toLowerCase().includes(keyword.toLowerCase())
        )
        setResultSearch(search)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }, [chapter, filteredData, keyword, language])

  console.log('passage app', selectedPassage)
  console.log('chap app', selectedChapter)


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
        setSelectedChapter={setSelectedChapter}
        setTotalChapter={setTotalChapter}
        totalChapter={totalChapter}
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
