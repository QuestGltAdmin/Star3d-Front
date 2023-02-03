import React from 'react'
import { cn } from '../../utilities/classname'
import Detail from '../Detail'

export default function StarStadiumDetail() {
  return (
    <div className={cn('flex items-center justify-center')}>
      <Detail title={"Star Stadium"} subtitle={"One stop place for any game!"} />
    </div>
  )
}
