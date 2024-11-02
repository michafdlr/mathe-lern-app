import React, { useState, useEffect} from 'react'
import { HiClock, HiMiniCheckCircle } from "react-icons/hi2";
import EditChapter from './EditChapter';

function ChaptersList({ course, refreshData, edit=true }) {
  const [updatedCourse, setUpdatedCourse] = useState(course);

  useEffect(() => {
    setUpdatedCourse(course);
  }, [course]);

  const handleCourseUpdate = (updatedCourse) => {
    setUpdatedCourse(updatedCourse);
  };
  return (
    <div className='mt-5 pb-10'>
      <h2 className='md:text-3xl text-2xl text-center text-primary'>Kapitel</h2>
      {updatedCourse?.courseOutput?.kapitel?.map((chapter, index) => {
        return (
          <div className='mt-2 flex items-center justify-between gap-3 border shadow-sm rounded-lg p-5' key={chapter?.name}>
            <div className='flex flex-col gap-2 p-5'>
              <div className='flex gap-2'>
                <h3 className='rounded-full flex-none bg-primary text-white md:w-10 md:h-10 w-4 h-4 text-center md:pt-1 md:text-2xl text-xs'>{index+1}</h3>
                <h3 className='text-md md:text-2xl md:pt-1'>
                  {chapter?.name}
                </h3>
                {updatedCourse && edit && <EditChapter course={course} onCourseUpdate={handleCourseUpdate} index={index} refreshData={() => refreshData(true)}/> }
              </div>
            <p className='text-xs text-justify md:text-md text-gray-500'>
              {chapter?.beschreibung}
            </p>
            <div className='flex gap-1'>
              <HiClock className='md:text-5xl text-2xl text-primary'/>
              <div>
                <h3 className='text-gray-500 text-xs md:text-sm'>Dauer</h3>
                <h3 className='md:text-lg text-xs'>{chapter?.dauer}</h3>
              </div>
            </div>
            </div>
            <HiMiniCheckCircle className='md:text-4xl text-2xl text-gray-300 flex-none'/>
          </div>
        )
      })}
    </div>
  )
}

export default ChaptersList
