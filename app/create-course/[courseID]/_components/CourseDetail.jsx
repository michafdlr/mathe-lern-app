import React from 'react'
import { HiChartBar, HiClock, HiTv, HiMiniBars3 } from "react-icons/hi2";

function CourseDetail({ course }) {
  return (
    <div className='border p-6 rounded-xl shadow-md mt-3'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4 content-center justify-center'>
        <div className='flex gap-1'>
          <HiChartBar className={`text-5xl ${course?.difficulty == 'mittel' && 'text-yellow-500'} ${course?.difficulty == 'leicht' && 'text-green-500'} ${course?.difficulty == 'schwer' && 'text-red-500'}`}/>
          <div>
            <h3 className='text-gray-500 text-xs md:text-sm'>Schwierigkeit</h3>
            <h3 className='text-lg'>{course?.difficulty}</h3>
          </div>
        </div>
        <div className='flex gap-1'>
          <HiClock className='text-5xl text-primary'/>
          <div>
            <h3 className='text-gray-500 text-xs md:text-sm'>Dauer</h3>
            <h3 className='text-lg'>{course?.courseOutput?.dauer}</h3>
          </div>
        </div>
        <div className='flex gap-1'>
          <HiTv className='text-5xl text-primary'/>
          <div>
            <h3 className='text-gray-500 text-xs md:text-sm'>Videos</h3>
            <h3 className='text-lg'>{course?.includeVideo}</h3>
          </div>
        </div>
        <div className='flex gap-1'>
          <HiMiniBars3 className='text-5xl text-primary'/>
          <div>
            <h3 className='text-gray-500 text-xs md:text-sm'>Kapitel</h3>
            <h3 className='text-lg'>{course?.courseOutput?.kapitel?.length}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
