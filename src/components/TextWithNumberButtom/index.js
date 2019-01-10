import React from 'react'
import styles from './style.module.css'
import Title from '../Title';
import colors from '../../shared/colorPalette'

export default ({ text, name, number, dark, containerStyle }) => {
  const classesNumber = [styles.Number]
  dark && classesNumber.push(styles.NumberDark)

  var status_color = (data) => {
    if (data <= 49) {
      return "#00CD98"
    }  else if (data <= 79) {
      return "#FF6B00"
    } else {
      return "#FF3737"
    }
  }

  return (
    <div style={{ ...containerStyle }}>
      <Title>{text}</Title>
      <p>{name}</p>
      <h2 style={{color: status_color(number)}} className={classesNumber.join(' ')}  >{number}%</h2>
    </div >
  )
}
