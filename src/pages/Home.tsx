import React from 'react'
import { useTranslation } from 'react-i18next'
import List from '../components/List/List'

interface HomeProps {
  passages: any[],
  chapter: any,
  setChapter: any,
}

const Home: React.FC<HomeProps> = ({
  passages = [],
  chapter, setChapter,
}) => {
  const { t } = useTranslation()

  const PL = passages.slice(0, 39)
  const PB = passages.slice(39, 66)
  console.log('pl', PL)
  console.log('pb', PB)

  return (
    <div style={{padding: '80px 20px 10px 20px'}}>
      <h4 style={{fontSize: '25px'}}>{t('perjanjianLama')}</h4>
      <List passages={PL} chapter={chapter} setChapter={setChapter} />
      <h4 style={{fontSize: '25px'}}>{t('perjanjianBaru')}</h4>
      <List passages={PB} chapter={chapter} setChapter={setChapter} />
    </div>
  )
}

export default Home