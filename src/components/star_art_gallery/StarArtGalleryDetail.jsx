import React from 'react'
import { cn } from '../../utilities/classname'
import Detail from '../Detail'

export default function StarArtGalleryDetail() {
  return (
    <div className={cn('flex items-center justify-center')}>
      <Detail title={"Star Art Gallery"} subtitle={"One stop shop for any art!"} />
    </div>
  )
}
