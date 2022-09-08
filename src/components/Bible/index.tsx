import React, {useState, useEffect} from 'react'

const Bible = () => {
    const [passages, setPassages] = useState<any[]>([])
    const [selectedPassage, setSelectedPassage] = useState<any>()
    const [chapters, setChapters] = useState<any[]>([])
    const [selectedChapter, setSelectedChapter] = useState<any>()
    const [contents, setContents] = useState<any>()

    useEffect(() => {
        fetch(
			`${process.env.REACT_APP_BIBLE_PASSAGE_LIST}`
		)
			.then(response => response.json())
			.then(data => {
				console.log({ data })
                setPassages(data.passage_list)
                if (data.passage_list && data.passage_list.length > 0) {
                    setSelectedPassage(data.passage_list[0])
                    
                }
                
			})
			.catch(error => {
				console.log(error)
			})
    }, [])

    useEffect(() => {
        if (selectedPassage && selectedPassage.total_chapter) {
            const arrChapter = []
            for (let i=1; i <= selectedPassage.total_chapter; i++) {
                arrChapter.push(i)
            }
            console.log({ selectedPassage })
            console.log({ arrChapter })
            setChapters(arrChapter)
            setSelectedChapter(arrChapter[0])
        }
    }, [selectedPassage])

    useEffect(() => {
        if (selectedChapter && selectedChapter > 0 && selectedPassage && selectedPassage.abbreviation) {
            const url = `${process.env.REACT_APP_BIBLE_URL_V3}${selectedPassage.abbreviation}/${selectedChapter}?ver=tb`
            console.log({ url })
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log({ data })
                    setContents(data.verses)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [selectedChapter, selectedPassage])

    return (
        <div />
    )
}

export default React.memo(Bible)

// gabungan book, dropdown 