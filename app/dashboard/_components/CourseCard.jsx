import Image from 'next/image'
import React from 'react'

function CourseCard({ course }) {
  return (
    <div className='border-2 rounded-lg p-3 m-2'>
      <Image
      src={course?.courseBanner || "/placeholder.png"} //5:00:52
      width={200}
      height={200}
      style={{width: 'auto', height: 'auto'}}
      alt="Kursbild"
      priority={true}
      />
      {course?.theme}
    </div>
  )
}

export default CourseCard
