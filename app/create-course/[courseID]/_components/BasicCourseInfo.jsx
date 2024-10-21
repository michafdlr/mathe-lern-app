import { Button } from '@/components/ui/button';
// import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HiOutlineAcademicCap } from "react-icons/hi2";
import EditCourseInfo from './EditCourseInfo';

function BasicCourseInfo({ course }) {
  const [updatedCourse, setUpdatedCourse] = useState(course);

  useEffect(() => {
    setUpdatedCourse(course);
  }, [course]);

  const handleCourseUpdate = (updatedCourse) => {
    setUpdatedCourse(updatedCourse);
  };
  return (
    <div className='mt-5 p-8 border shadow-md rounded-xl'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <h3 className='text-xl md:text-2xl text-primary'>
            {updatedCourse?.theme} {updatedCourse && <EditCourseInfo course={updatedCourse} onCourseUpdate={handleCourseUpdate}/>}
          </h3>
          <p className='mt-2 text-justify text-sm text-gray-500'>
            {updatedCourse?.courseOutput?.beschreibung}
          </p>
          <h3 className='font-medium mt-2 flex flex-row gap-2 items-center text-primary'><HiOutlineAcademicCap /> {course?.subject}</h3>
          <Button className='w-full mt-4'>Start</Button>
        </div>
        <div className='flex justify-center'>
          <img src="https://fakeimg.pl/200x100/?text=Bild" alt="placeholder image"
          className='w-full rounded-xl border-black border-2 object-cover'/>
          {/* <Image
          src={"/placeholder.png"}
          width={200}
          height={200}
          alt='placeholder image'
          // style={{width: "250px", height: "200px"}}
          className='w-full rounded-xl border-2 border-black h-[200px] object-cover'
          /> */}
        </div>
      </div>
    </div>
  )
}

export default BasicCourseInfo
