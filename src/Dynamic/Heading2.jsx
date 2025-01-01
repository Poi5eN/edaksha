import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

const Heading2 = ({children,title}) => {
    const { currentColor } = useStateContext();
  return (
    <div
    className="rounded-tl-lg rounded-tr-lg  text-lg  mb-2 mx-4 mt-14 md:mt-0 relative min-h-[24px]"
    style={{ borderBottom: ` solid 2px ${currentColor}` }}
  >
    {
        children
    }
 
    <div
    className="absolute text-center font-extrabold "
    style={{
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color:currentColor
    }}
  >
    {title}</div>
  </div>
  )
}

export default Heading2