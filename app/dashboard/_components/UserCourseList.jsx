'use client'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'
import { SkeletonCard } from '@/app/_skeletons/SkeletonCard'

function UserCourseList() {
  const [coursesBySubject, setCoursesBySubject] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {userCourseList, setUserCourseList} = useContext(UserCourseListContext);
  const {user} = useUser();

  useEffect(() => {
    user && getUserCourses();
  }, [user])
  const getUserCourses = async () => {
    setIsLoading(true);
    const result = await db.select().from(CourseList).where(eq(CourseList?.createdBy, user?.primaryEmailAddress.emailAddress));
    setUserCourseList(result);

    const coursesBySubject = result.reduce((acc, course) => {
      const subject = course.subject;
      if (!acc[subject]) {
        acc[subject] = [];
      }
      acc[subject].push(course);
      return acc;
    }, {});
    setCoursesBySubject(coursesBySubject);
    setIsLoading(false);
  };
  if (isLoading) {
    return (
      <div className='mt-2 mx-2'>
        <h2 className='text-secondary text-lg md:text-xl font-bold'>
          Meine Lernpfade
        </h2>
        <div className='mt-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2'>
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='mt-2 mx-2'>
      <h2 className='text-secondary text-lg md:text-xl font-bold'>
        Meine Lernpfade
      </h2>
      <div>
        {userCourseList?.length>0 ? Object.keys(coursesBySubject).sort().map((subject, idx) => (
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
        )): <h2>Loading</h2>
        }
      </div>
    </div>
  )
}

export default UserCourseList
