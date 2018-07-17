import React from 'react'
import styles from './styles.module.css'

export default ({ children }) => {
  return (
    <div className={styles.FlexColumn}>
      {children}
    </div>
  )
}