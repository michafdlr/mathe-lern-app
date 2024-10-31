'use client'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import SubjectList from '@/app/_shared/SubjectList'

function UserCourseList() {
  const [coursesBySubject, setCoursesBySubject] = useState({});
  const {user} = useUser();

  useEffect(() => {
    user && getUserCourses();
  }, [user])
  const getUserCourses = async () => {
    const result = await db.select().from(CourseList).where(eq(CourseList?.createdBy, user?.primaryEmailAddress.emailAddress));

    const coursesBySubject = result.reduce((acc, course) => {
      const subject = course.subject;
      if (!acc[subject]) {
        acc[subject] = [];
      }
      acc[subject].push(course);
      return acc;
    }, {});
    setCoursesBySubject(coursesBySubject);
    console.log(coursesBySubject);
  };

  return (
    <div className='mt-2 mx-2'>
      <h2 className='text-secondary text-lg md:text-xl font-bold'>
        Meine Lernpfade
      </h2>
      <div>
        {Object.keys(coursesBySubject).sort().map((subject, idx) => (
          <div key={idx} className='flex flex-col my-2'>
            <h2 className='text-md md:text-lg font-bold underline text-primary'>
              {subject}
            </h2>
            <div className='mt-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2'>
              {coursesBySubject[subject].map((course, index) => (
                <CourseCard key={index} course={course} refreshData={() => getUserCourses()}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserCourseList
