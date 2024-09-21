import React from 'react'
import '../../asset/scss/PlaceHolder.module.scss'

const PlaceHolder = (props) => {
  return (
    <div className='containerPH'>
      <main className='wrapper'>
        <label htmlFor={props.id}>{props.label}</label>
        <input id={props.id} type='text' placeholder={props.placeholder} />
      </main>
    </div>
  )
}

export default PlaceHolder