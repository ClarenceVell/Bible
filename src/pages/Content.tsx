import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BreadCrumb from '../components/BreadCrumb/BreadCrumb'

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
    console.log('hkjkjh')
    if(resultSearch?.length > 0 ){
      console.log('hahahaaa')
      if(resultSearch[0]?.type === "title"){
        console.log('JALAN')
        const removed = resultSearch.shift()
        setVerse(removed)
      } else {
        setVerse('')
      }
    }
  }, [resultSearch])



  console.log(verse?.content, 'verses')

  
  return (
    <div style={{padding: '80px 20px 10px 20px'}}>
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