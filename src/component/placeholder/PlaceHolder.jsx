import React from 'react';
import styles from '../../asset/scss/PlaceHolder.module.scss';

const PlaceHolder = (props) => {
  return (
    <div className={styles.containerPH}>
      <main className={styles.wrapper}>
        <label htmlFor={props.id}>{props.label}</label>
        <input id={props.id} type={props.type || 'text'} placeholder={props.placeholder} />
      </main>
    </div>
  );
};

export default PlaceHolder;