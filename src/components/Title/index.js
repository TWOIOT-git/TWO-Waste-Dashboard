import React from 'react'
import styles from './styles.module.css'

const Title = ({ children }) => {
  return <h4 className={styles.Title}>{children}</h4>
}

export default Title;