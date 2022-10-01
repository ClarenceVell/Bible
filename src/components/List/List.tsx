import React, {useState, useEffect} from 'react'
import {ConList, Container} from './styled'
import Loader from '../Loader/Loader'
import { to } from '../BreadCrumb/Data'

interface ListProps {
  passages: any[],
  chapter: any,
  setChapter: any
}

const List: React.FC<ListProps> = ({
  passages = [],
  chapter, setChapter
}) => {
  
  const handleClick = (data:any) => {
    setChapter(1)
    if(to.length === 1){
      to.push({ name: 'Content', url: `/bible/${data.abbreviation.replace(/\s/g, '')}/${chapter}`})
    }
  }
  
  console.log(to)
  if (!passages?.length) return <Loader/>;

  return (
    <Container>
      {passages.map((pass:any, idx:number) => (
        <ConList 
          to={`/bible/${pass.abbreviation.replace(/\s/g, '')}/1`} 
          key={idx} 
          passages={passages[0].abbreviation === 'Kej' ? 'PL' : 'PB'}
          onClick={() => handleClick(pass)}
        >
          <p>{pass.book_name}</p>
        </ConList>
      ))}
    </Container>
  )
}

export default List