import React from 'react'
import { ScreenClassRender } from 'react-grid-system'


const MarginTop = ({ children }) => {
  return (
    <ScreenClassRender render={screenClass => {
      const marginTop = ['xs', 'sm', 'md'].includes(screenClass) ? '2rem' : null
      const chidrenModified = React.cloneElement(children, { ...(marginTop ? { style: { marginTop: marginTop } } : null) })
      return chidrenModified
    }} />
  )
}

export default MarginTop