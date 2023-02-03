import React from 'react'
import { cn } from '../../utilities/classname'
import Detail from '../Detail'

export default function StarArenaDetail() {
  return (
    <div className={cn('flex items-center justify-center')}>
      <Detail title={"Star Arena"} subtitle={"One stop destination for any event!"} />
    </div>
  )
}
