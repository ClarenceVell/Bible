import React, {useEffect, useState} from 'react'
import { AiFillCaretDown } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'

import { ConDropdown, Dropdownn, ConOption, OptionUnlist, OptionList, Icon } from './styled'

interface DropdownProps {
  passages: any,
  selectedPassage: any,
  setSelectedPassage: any,
  selectedChapter: any,
  totalChapter: any,
  width: number,
}

const Dropdown: React.FC<DropdownProps> = ({
  passages, 
  selectedPassage,
  setSelectedPassage,
  selectedChapter,
  totalChapter,
  width, 
}) => {
  const navigate = useNavigate()
  const [isOpenPass, setIsOpenPass] = useState<boolean>(false)
  const [isOpenChap, setIsOpenChap] = useState<boolean>(false)
  const [chapters, setChapters] = useState<any[]>()


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
      <ConDropdown isMobile={width <= 480}>
        <div style={{width: '100%', background: 'reds'}}>

          <Dropdownn>
              <p>{selectedPassage? selectedPassage : passages[0]?.book_name }</p>
              <AiFillCaretDown 
                onClick={() => {
                  setIsOpenPass(!isOpenPass)
                  setIsOpenChap(false)
                }}
                style={{fontSize: '14px', cursor: 'pointer'}} 
              />
          </Dropdownn>
          
          {/* <div> */}
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
          {/* </div> */}
        </div>
        
        <div>
          
          <Dropdownn>
              <p>{selectedChapter ? selectedChapter : '-'}</p>
              <AiFillCaretDown 
                onClick={() =>{
                  setIsOpenChap(!isOpenChap)
                  setIsOpenPass(false)
                }}
                style={{fontSize: '14px', cursor: 'pointer'}} 
              />
          </Dropdownn>
        </div>
      </ConDropdown>

    
      {isOpenChap && (
        <ConOption>
            <OptionUnlist height='400px'>
              {chapters?.map((chap:any, idx:number) =>(
                <div style={{display: 'flex'}} key={idx}>
                  <Icon>
                    {selectedChapter === chap? '✔' : ''}
                  </Icon>

                    <OptionList
                      onClick={(e:any) => {
                        setIsOpenChap(false)
                        navigate(`/bible/${selectedPassage.replace(/\s/g, '')}/${chap}`)
                      }}
                    >
                      {chap}
                    </OptionList>

                </div>
              ))}
            </OptionUnlist>
        </ConOption>
      )}

    </div>
  )
}

export default Dropdown