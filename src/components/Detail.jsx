import React from 'react'
import { cn } from '../utilities/classname'

export default function Detail({title, subtitle,...detailProps}) {
  return (
    <>
      <div className={cn("flex flex-col items-center")}>
        <h1 className='text-5xl font-extrabold text-white '>{title}</h1>
        <p className='text-gray-200'>{subtitle}</p>
      </div>

    </>
  )
}
