import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function SkeletonCourseDetail() {
  return (
    <div className='border p-6 rounded-xl shadow-md mt-3'>
      <Skeleton className='w-full h-8 bg-slate-200'/>
    </div>
  )
}

export default SkeletonCourseDetail
