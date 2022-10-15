import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components';
import BreadCrumb from '../components/BreadCrumb/BreadCrumb'
import Loader from '../components/Loader/Loader'
import { useSpeechSynthesis } from 'react-speech-kit';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

export const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
  
  p{
    font-weight: bold;
  }
  
  div{
    margin-top: 6px;
    cursor: pointer;
  }

`

interface ContentProps {
    textColor: any
    titleSize: any
    textSize: any
    resultSearch: any
    loading: boolean
    language: any
}

const Content : React.FC<ContentProps> = ({textColor, titleSize, textSize, resultSearch, loading, language}) => {
  const [verse, setVerse] = useState<any>()
  const [isSpeak, setIsSpeak] = useState<boolean>(true)
  const [speakText, setSpeakText] = useState<any[]>()
  const { speak, cancel } = useSpeechSynthesis();
  // const lang = useMemo(() => {
  //   const langData = localStorage.getItem('lang')

  //   return langData || 'tb'
  // }, [])

  // let voiceOptions = window.speechSynthesis.getVoices();

  // let msg = new SpeechSynthesisUtterance()

  useEffect(() => {
    if(resultSearch?.length > 0 ){
      if(resultSearch[0]?.type === "title"){
        const removed = resultSearch.shift()
        setVerse(removed)
      } else {
        setVerse('')
      }
    }
  }, [resultSearch])

  const speaks = (text:any) => {
    if (text === '') {
      cancel()
    } else {
      speak({text})
    }
    setIsSpeak(!isSpeak)
  }

  if(loading) return <Load> <Loader /> </Load> 

  return (
    <div style={{padding: '80px 20px 10px 30px'}}>
        <BreadCrumb textColor={textColor} />
        <Title style={{fontSize: titleSize}}>
          <p>
            {verse?.content} 
          </p>
          { language === 'net' && verse?.content  && (
            <div
              onClick={ isSpeak ? () => speaks(`${verse?.content}. ${resultSearch.map((v: any) => {return v.content}).join(' ')}`) : () => speaks('')}
            >
              {isSpeak ? <HiVolumeOff /> : <HiVolumeUp/>}
            </div>
          )}
        </Title>
        <ol>
          {resultSearch?.map((x:any, idx:number) => (
            <div 
                style={{padding: '0 20px'}} key={idx}>
              <li style={{fontSize: textSize, marginBottom: '6px'}}>{x.content}</li>
            </div>
          ))}
        </ol>
    </div>
  )
}

export default Content

