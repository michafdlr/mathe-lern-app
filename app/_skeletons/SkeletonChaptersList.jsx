import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function SkeletonChaptersList() {
  return (
    <div className='mt-5 pb-10'>
      <h2 className='md:text-3xl text-2xl text-center text-primary'>Kapitel</h2>
      <div className='mt-2 flex items-center justify-between gap-3 border shadow-sm rounded-lg p-5'>
        <Skeleton className='w-full h-[200px] bg-slate-200'/>
      </div>
    </div>
  )
}

export default SkeletonChaptersList
