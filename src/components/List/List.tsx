import React from 'react'
import {ConList, Container} from './styled'
import Loader from '../Loader/Loader'
import { to } from '../BreadCrumb/Data'
import { useTranslation } from 'react-i18next'

interface ListProps {
  passages: any[],
  chapter: any,
  setChapter: any
}

const List: React.FC<ListProps> = ({
  passages = [],
  chapter, setChapter
}) => {
  const { t } = useTranslation()
  
  const handleClick = (data:any) => {
    setChapter(1)
    if(to.length === 1){
      to.push({ name: 'Content', url: `/bible/${data.abbreviation.replace(/\s/g, '')}/${chapter}`})
    }
  }
  
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
          <p>{t(pass.book_name) || pass.book_name}</p>
        </ConList>
      ))}
    </Container>
  )
}

export default List