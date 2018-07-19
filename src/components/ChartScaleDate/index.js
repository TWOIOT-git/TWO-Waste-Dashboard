import React from 'react'
import styles from './styles.module.css'

const ChartScaleDate = () => {
  return (
    <div className={styles.ChartScaleDate}>
      <div>Today</div>
      <div className={styles.Active}>Week</div>
      <div>Month</div>
      <div>Year</div>
      <div>All-time</div>
    </div>
  )
}

export default ChartScaleDate