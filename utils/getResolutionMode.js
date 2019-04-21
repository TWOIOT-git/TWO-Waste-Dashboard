/** 
* Get device resolution descriptive name: 'xs', 'sm', 'md', 'lg', 'xl'
* Or compare the parameter name with the resolution name
*/

export const defaultBreakpoints = [576, 768, 992, 1200]

const getResolutionName = (nameToCompare) => {
  const viewport = window.innerWidth

  let name = 'xs'
  
  if (viewport) {
    if (viewport >= defaultBreakpoints[0]) name = 'sm'
    if (viewport >= defaultBreakpoints[1]) name = 'md'
    if (viewport >= defaultBreakpoints[2]) name = 'lg'
    if (viewport >= defaultBreakpoints[3]) name = 'xl'
  }

  return nameToCompare ? nameToCompare === name : name
}

export default getResolutionName