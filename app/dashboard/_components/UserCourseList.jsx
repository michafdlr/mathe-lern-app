'use client'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import SubjectList from '@/app/_shared/SubjectList'

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
      <div>
        {
          SubjectList?.map((subject, idx) => {
            return (
              <div key={idx} className='flex flex-col my-2'>
                <h2 className='text-md md:text-lg font-bold underline text-primary'>
                  {subject.name}
                </h2>
                  <div className='mt-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2'>
                    {courseList?.map((course, index) => {
                      if (course?.subject == subject.name) {
                        return (
                          <CourseCard key={index} course={course}/>
                        )
                      }
                    })}
                  </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default UserCourseList
