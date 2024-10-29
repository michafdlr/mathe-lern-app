import Image from 'next/image'
import React from 'react'
import { HiBookOpen, HiChartBar } from "react-icons/hi2";

function CourseCard({ course }) {
  return (
    <div className='border-2 rounded-lg p-2 shadow-sm hover:scale-105 transition-all duration-200 cursor-pointer'>
      <Image
      src={course?.courseBanner || "/placeholder.png"} //5:00:52
      width={300}
      height={150}
      style={{width: 'auto', height: '150px'}}
      alt="Kursbild"
      priority={true}
      className='w-full h-[250px] object-scale-down'
      />
      <div className='p-2'>
        <h2 className='font-bold text-lg flex-none'>{course?.theme}</h2>

        <div className='flex justify-between mt-2'>
          <h2 className='flex gap-2 items-center p-1 bg-cyan-100 rounded-md text-sm'>
            <HiBookOpen />
            {course?.courseOutput?.kapitel?.length} Kapitel
          </h2>

          <h2 className='flex gap-2 items-center p-1 bg-cyan-100 rounded-md text-sm'>
            <HiChartBar className={`${course?.difficulty == 'leicht' ? 'text-green-500' : course?.difficulty == 'mittel' ? 'text-yellow-500': 'text-red-500'}`}/>
            {course?.difficulty}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
