import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BreadCrumb from '../components/BreadCrumb/BreadCrumb'

interface ContentProps {
    data: any[]
    content: any
    textColor: any
}

const Content : React.FC<ContentProps> = ({data, content, textColor}) => {
  const [verse, setVerse] = useState<any>()
  console.log('DATA', data)
  console.log('CONTENT', content)
  // // console.log(content.verses)
  useEffect(() => {
    console.log('hkjkjh')
    console.log(content?.verses?.length > 0 )
    if(content && content?.verses?.length > 0 ){
      console.log('hahahaaa')
      if(content?.verses[0]?.type == "title"){
        console.log('JALAN')
        const removed = content.verses.shift()
        setVerse(removed)
      }
    }
    console.log(verse, 'verses')
  }, [content])

  console.log(verse?.content, 'verses')

  
  return (
    <div style={{padding: '80px 20px 10px 20px'}}>
        <BreadCrumb textColor={textColor} />
        <p style={{fontSize: '23px', fontWeight: 'bold', textAlign: 'center', margin: '10px 0'}}>{verse?.content}</p>
        <ol>
          {content?.verses?.map((x:any, idx:number) => (
            <div style={{padding: '0 20px'}} key={idx}>
              <li style={{fontSize: '20px', marginBottom: '6px'}}>{x.content}</li>
            </div>
          ))}
        </ol>
    </div>
  )
}

export default Content