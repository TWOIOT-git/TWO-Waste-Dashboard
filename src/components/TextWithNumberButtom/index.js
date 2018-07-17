import React from 'react'
import styles from './style.module.css'
import Title from '../Title';

export default ({ text, number, dark, containerStyle }) => {
  const classesNumber = [styles.Number]

  dark && classesNumber.push(styles.NumberDark)

  return (
    <div style={{ ...containerStyle }}>
      <Title>{text}</Title>
      <h2 className={classesNumber.join(' ')}>{number}</h2>
    </div >
  )
}
