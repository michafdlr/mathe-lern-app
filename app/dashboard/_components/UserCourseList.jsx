'use client'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const {user} = useUser();

  useEffect(() => {
    user && getUserCourses();
  }, [user])
  const getUserCourses = async () => {
    const result = await db.select().from(CourseList).where(eq(CourseList?.createdBy, user?.primaryEmailAddress.emailAddress));
    console.log(result);
    setCourseList(result);
  }
  return (
    <div className='mt-2 mx-2'>
      <h2 className='text-secondary text-lg md:text-xl font-bold'>
        Meine Lernpfade
    </h2>
      {courseList?.map((course, index) => {
        return (
          <CourseCard key={index} course={course}/>
        )
      })}
    </div>
  )
}

export default UserCourseList
