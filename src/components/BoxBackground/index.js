import React from 'react'
import styles from './styles.module.css'

const BoxBackground = ({ children, wrapperProps }) => {
  return (
    <div className={styles.BoxBackground} {...(wrapperProps ? wrapperProps : {})}>
      {children}
    </div>
  )
}

export default BoxBackground