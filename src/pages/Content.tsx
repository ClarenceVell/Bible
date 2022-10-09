import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import BreadCrumb from '../components/BreadCrumb/BreadCrumb'
import Loader from '../components/Loader/Loader'
import { useSpeechSynthesis } from 'react-speech-kit';

export const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

interface ContentProps {
    textColor: any
    titleSize: any
    textSize: any
    resultSearch: any
    loading: boolean
}

const Content : React.FC<ContentProps> = ({textColor, titleSize, textSize, resultSearch, loading}) => {
  const [verse, setVerse] = useState<any>()
  // const { speak } = useSpeechSynthesis();
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


  if(loading) return <Load> <Loader /> </Load> 

  
  
  return (
    <div style={{padding: '80px 20px 10px 30px'}}>
        <BreadCrumb textColor={textColor} />
        <p style={{fontSize: titleSize, fontWeight: 'bold', textAlign: 'center', margin: '10px 0'}}>{verse?.content}</p>
        <ol>
          {resultSearch?.map((x:any, idx:number) => (
            <div 
            // onClick={() => speak({ text: x.content,
              // voices: { 
              //   default: true,
              //   lang: "id-ID",
              //   localService: true,
              //   name:"Microsoft Gadis Online (Natural) - Indonesian (Indonesia)",
              //   voiceURI: "Microsoft Gadis Online (Natural) - Indonesian (Indonesia)"
              //  } 
              // })}
                style={{padding: '0 20px'}} key={idx}>
              <li style={{fontSize: textSize, marginBottom: '6px'}}>{x.content}</li>
            </div>
          ))}
        </ol>
    </div>
  )
}

export default Content

