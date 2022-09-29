import React, {useEffect, useState} from 'react'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { ConDropdown, Dropdownn, ConOption, OptionUnlist, OptionList, Icon } from './styled'

interface DropdownProps {
  passages: any,
  selectedPassage: any,
  setSelectedPassage: any,
  selectedChapter: any,
  setSelectedChapter: any,
  setTotalChapter:any,
  totalChapter: any,
  data: any,
  chapter: any,
}

const Dropdown: React.FC<DropdownProps> = ({
  passages, 
  selectedPassage,
  setSelectedPassage,
  selectedChapter,
  setSelectedChapter,
  totalChapter,
  setTotalChapter,
  data, chapter
}) => {
  const navigate = useNavigate()
  const [isOpenPass, setIsOpenPass] = useState<boolean>(false)
  const [isOpenChap, setIsOpenChap] = useState<boolean>(false)
  const [chapters, setChapters] = useState<any[]>()

  // useEffect(() => {
  //   localStorage.setItem('chapters', chapters)
  // }, [chapters])

  // useEffect(() => {
  //   setSelectedPassage(data[0]?.book_name )
  //   setSelectedChapter(parseInt(chapter) )
  // }, [chapter, data, setSelectedChapter, setSelectedPassage])

  useEffect(() => {
    let arrChap = []
    console.log({ totalChapter })
    for(let i = 1; i <= totalChapter; i++){
      arrChap.push(i)
    }
    setChapters(arrChap)
  }, [totalChapter])

  return (
    <div>
      <ConDropdown>
          <Dropdownn>
              <p>{selectedPassage? selectedPassage : passages[0]?.book_name }</p>
              <AiFillCaretDown 
                onClick={() => setIsOpenPass(!isOpenPass)}
                style={{fontSize: '14px', cursor: 'pointer'}} 
              />
          </Dropdownn>

          <Dropdownn>
              <p>{selectedChapter ? selectedChapter : '-'}</p>
              <AiFillCaretDown 
                onClick={() => setIsOpenChap(!isOpenChap)}
                style={{fontSize: '14px', cursor: 'pointer'}} 
              />
          </Dropdownn>
      </ConDropdown>

      {isOpenPass && (
        <ConOption>
            <OptionUnlist height='1100px'>
              {passages.map((pass:any, idx:number) =>(
                <div style={{display: 'flex'}} key={idx}>
                  <Icon>
                    {selectedPassage === pass? '✔' : ''}
                  </Icon>
                  <OptionList
                    onClick={(e:any) => {
                      setSelectedPassage(e.target.textContent)
                      setIsOpenPass(false)
                      setIsOpenChap(true)
                    }}
                  >
                    {pass?.book_name}
                  </OptionList>
                </div>
              ))}
            </OptionUnlist>
        </ConOption>
      )}

      {isOpenChap && (
        <ConOption>
            <OptionUnlist height='400px'>
              {chapters?.map((chap:any, idx:number) =>(
                <div style={{display: 'flex'}} key={idx}>
                  <Icon>
                    {selectedChapter === chap? '✔' : ''}
                  </Icon>

                  {/* <Link to={`/bible/${localStorage.getItem('passage')}/${selectedChapter}`}> */}
                    <OptionList
                      onClick={(e:any) => {
                        setIsOpenChap(false)
                        // navigate(`/`)
                        navigate(`/bible/${selectedPassage}/${chap}`)
                      }}
                    >
                      {chap}
                    </OptionList>
                  {/* </Link> */}
                </div>
              ))}
            </OptionUnlist>
        </ConOption>
      )}

    </div>
  )
}

export default Dropdown