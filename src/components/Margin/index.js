import React from 'react'
import { ScreenClassRender } from 'react-grid-system'

const Margin = ({ children, orientation, breakpoints }) => {
  if (['right', 'left', 'bottom', 'top'].includes(orientation)) {
    const orientationMargin = `margin${orientation.replace(/\w/, c => c.toUpperCase())}`
    return (
      <ScreenClassRender render={screenClass => {
        const margin = breakpoints.includes(screenClass) ? '2rem' : null // ['xs', 'sm', 'md']
        const chidrenModified = React.cloneElement(children, {
          ...(margin ? {
            style: {
              [orientationMargin]: margin,
              height: 'unset' // Temp "hack"
            }
          } : null)
        })
        return chidrenModified
      }} />
    )
  }
  else {
    console.warn("[Margin Component]: Need orientation -> ['right', 'left', 'bottom', 'top'] ")
    return null
  }
}

export default Margin