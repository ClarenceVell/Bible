import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import BreadCrumb from '../components/BreadCrumb/BreadCrumb'
import Loader from '../components/Loader/Loader'

export const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

interface ContentProps {
    data: any[]
    content: any
    textColor: any
    titleSize: any
    textSize: any
    resultSearch: any
}

const Content : React.FC<ContentProps> = ({data, content, textColor, titleSize, textSize, resultSearch}) => {
  const [verse, setVerse] = useState<any>()
  console.log('DATA', data)
  console.log('CONTENT', content)
  // // console.log(content.verses)
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

  if(!resultSearch) return <Load> <Loader /> </Load> 
  
  return (
    <div style={{padding: '80px 20px 10px 30px'}}>
        <BreadCrumb textColor={textColor} />
        <p style={{fontSize: titleSize, fontWeight: 'bold', textAlign: 'center', margin: '10px 0'}}>{verse?.content}</p>
        <ol>
          {resultSearch?.map((x:any, idx:number) => (
            <div style={{padding: '0 20px'}} key={idx}>
              <li style={{fontSize: textSize, marginBottom: '6px'}}>{x.content}</li>
            </div>
          ))}
        </ol>
    </div>
  )
}

export default Content