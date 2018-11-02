import React from 'react'
import './styles.css'

const Tooltip = ({
  bin_level,
  className
}) => {
  const classes = ["Tooltip-wrapper"]

  className && classes.push(className)

  return (
    <div className={classes.join(" ")}>
        <p> { bin_level } </p>
    </div>
  )
}

export default Tooltip
