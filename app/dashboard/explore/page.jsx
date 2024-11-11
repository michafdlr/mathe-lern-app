'use client'

import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';

function Explore() {

  const [courses, setCourses] = useState([]);

  useEffect(()=> {
    getAllCourses();
  }, [])

  const getAllCourses = async () => {
    const res = await db.select().from(CourseList).limit(9).offset(0);
    console.log(res);
    setCourses(res);
  }
  return (
    <div className='mt-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2'>
      {courses?.map((course, index) => <CourseCard key={index} course={course}/>)}
    </div>
  )
}

export default Explore
