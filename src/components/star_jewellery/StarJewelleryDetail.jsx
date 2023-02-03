import React from 'react'
import { cn } from '../../utilities/classname'
import Detail from '../Detail'

export default function StarJewelleryDetail() {
  return (
    <div className={cn('flex items-center justify-center')}>
      <Detail title={"Star Jewellery"} subtitle={"One stop shop for any jewellery!"} />
    </div>
  )
}
