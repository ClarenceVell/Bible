import React, {useState, useEffect} from 'react'
import List from '../components/List/List'

function Home() {
  const [passages, setPassages] = useState<any[]>([])

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BIBLE_PASSAGE_LIST}`
    )
      .then(response => response.json())
      .then(data => {
        console.log({ data })
                setPassages(data.passage_list)
                // if (data.passage_list && data.passage_list.length > 0) {
                //     setSelectedPassage(data.passage_list[0])
                    
                // }
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const pl = passages.slice(0, 39)
  const pb = passages.slice(39, 66)
  console.log('pl', pl)
  console.log('pb', pb)

  return (
    <div style={{paddingTop: '75px'}}>
      <List passages={passages} />
    </div>
  )
}

export default Home