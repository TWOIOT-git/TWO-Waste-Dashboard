import React from 'react'
import styles from './styles.module.css'

const AnalizeLink = ({ onClick }) => <div {...(onClick ? onClick : {})} className={styles.AnalizeLink}>Analize ></div>


export default AnalizeLink