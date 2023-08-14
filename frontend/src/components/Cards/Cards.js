import React from 'react'
import './Cards.css'

import Card from '../Card/Card'


const Cards = (props) => {

  const { data } = props;

  return (
    <div className='cards'>  
        <div className='parentContainer'>
            <div style={{
                backgroundColor: 'rgb(252, 146, 156, 0.8)',
                borderRadius: '1rem'
                }}><Card data={data[0]}/></div>
        </div>
        
        <div className='parentContainer'>
            <div style={{
                backgroundColor: 'rgb(255 202 113)',
                borderRadius: '1rem'
                }}><Card data={data[1]}/></div>
        </div>

    </div>
  )
}

export default Cards