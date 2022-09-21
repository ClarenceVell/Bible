import React from 'react'
// import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import { to } from './Data'
// import styled, {css} from 'styled-components';

// const Container = styled.div`
//     color: 'red
// `
interface BreadCrumbProps {
  textColor: any,
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({textColor}) => {

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize:'16px'}} >
        {to?.map((x, idx) => (
            <Link to={x.url} key={idx} style={{color: textColor, display: 'flex', textDecoration: 'none', alignItems: 'center', gap: '8px'}}>
                <p>{x.name}</p>
                <h2 style={{fontWeight: 'bold'}}>/</h2>
            </Link>
        ))}
    </div>
  )
}

export default BreadCrumb