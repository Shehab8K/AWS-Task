import React from 'react'
import './Card.css'
import { UilArchive, UilCube} from '@iconscout/react-unicons'
import NumberAnimation from '../NumberAnimation/NumberAnimation'

const Card = (props) => {
  return (
    <div className='card'>

          <div className='container'>
              <div className='title'>{props.data.name} 
                  <span className='icon'>
                  {props.data.name === 'Buckets' ? (
                         <UilArchive size={30} />
                        ) : props.data.name === 'Objects' ? (
                        <UilCube size={35} />
                        ) : null}
                  </span>
              </div>
              <div className='number'>
                  <NumberAnimation targetNumber={props.data.count}/>
              </div>
          </div>


    </div>
  )
}

export default Card