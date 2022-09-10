import React, {useState, useEffect} from 'react'

interface ListProps {
  passages: any[]
}

const List: React.FC<ListProps> = ({
  passages = []
}) => {
  

  return (
    <div>List</div>
  )
}

export default List