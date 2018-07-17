import React from 'react'
import styles from './styles.module.css'

const BoxBackground = ({ children }) => {
  return (
    <div className={styles.BoxBackground}>
      {children}
    </div>
  )
}

export default BoxBackground