import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function SkeletonBasicCourseInfo() {
  return (
    <div className='mt-5 p-8 border shadow-md rounded-xl'>
      <Skeleton className='w-full h-[250px] bg-slate-200'/>
    </div>
  )
}

export default SkeletonBasicCourseInfo
