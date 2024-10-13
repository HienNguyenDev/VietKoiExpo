import React from 'react'
import styles from '../../../asset/scss/Wave.module.scss'  
import doggi from '../../../asset/gif/6os.gif'
import wind from '../../../asset/gif/3F3I.gif'
const WaveAnimation = () => {
  return (
    <div className='container-wave'>
        <div className={styles.wind}>
            <img  src={wind} alt="Wind GIF" />
        </div>
        <div class={`${styles.ocean}`}>
            <div className={styles.doggi} style={{position:'absolute' ,bottom:'7rem'}}>
            <img src={doggi} alt="Doggi GIF" />
            </div>
            <div class={styles.wave}></div>
            <div  class={styles.wave}></div>
        </div>
    </div>
  )
}

export default WaveAnimation