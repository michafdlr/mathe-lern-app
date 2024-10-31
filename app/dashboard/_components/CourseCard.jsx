import Image from 'next/image'
import React from 'react'
import { HiBookOpen, HiChartBar, HiEllipsisVertical } from "react-icons/hi2";
import DropdownOption from './DropdownOption';
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

function CourseCard({ course, refreshData }) {
  const handleOnDelete = async () => {
    const resultList = await db.delete(CourseList)
    .where(eq(CourseList.courseID, course?.courseID))
    .returning({courseID: CourseList.courseID});

    const resultChapters = await db.delete(Chapters)
    .where(eq(Chapters.courseID, course?.courseID))
    .returning({chapterID: Chapters.chapterID});

    if (resultList && resultChapters) {
      refreshData();
    }
  }
  return (
    <div className='border-2 rounded-lg p-2 shadow-sm cursor-pointer'>
      <Image
      src={course?.courseBanner || "/placeholder.png"} //5:00:52
      width={200}
      height={100}
      alt="Kursbild"
      priority={true}
      className='w-full h-[200px] object-scale-down'
      style={{width: 'auto', height: '100px'}}
      />
      <div className='p-2'>
        <h2 className='font-bold text-lg flex justify-between items-center'>
          {course?.theme}
          <DropdownOption
          handleOnDelete={()=>handleOnDelete()}
          >
            <HiEllipsisVertical className='flex-none'/>
          </DropdownOption>
        </h2>

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
