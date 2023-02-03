import React from 'react'
import { cn } from '../../utilities/classname'
import Detail from '../Detail'

export default function StarOfficeDetail() {
  return (
    <div className={cn('flex items-center justify-center')}>
      <Detail title={"Star Office"} subtitle={"One and only quest workplace!"} />
    </div>
  )
}
