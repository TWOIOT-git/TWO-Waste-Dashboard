import React from 'react'
import './styles.css'

const Tooltip = ({
  currency,
  porcentage,
  className
}) => {
  const classes = ["Tooltip-wrapper"]

  className && classes.push(className)

  return (
    <div className={classes.join(" ")}>
        <p> { currency } </p>
        <p> { porcentage } </p>
    </div>
  )
}
 
export default Tooltip