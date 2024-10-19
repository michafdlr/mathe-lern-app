//2:54:50
'use client'
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BasicCourseInfo from './_components/BasicCourseInfo';
import CourseDetail from './_components/CourseDetail';
import ChaptersList from './_components/ChaptersList';

function CourseLayout({ params }) {
  const {user} = useUser();
  const [course, setCourse] = useState([]);
  useEffect(() => {
    params&&getCourse();
  }, [params, user])

  const getCourse = async () => {
    const result = await db.select().from(CourseList).where(
      and(
        eq(CourseList?.courseID, params?.courseID),
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
    )
    );
    console.log(result[0]);
    setCourse(result[0]);
  }
  // 3:03:16
  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='md:text-3xl text-xl font-bold text-secondary text-center'>Lernpfad Vorschlag</h2>

      {/* Basic Info */}
      <BasicCourseInfo course={course} />
      {/* Course detail */}
      <CourseDetail course={course} />
      {/* List of Chapters */}
      <ChaptersList course={course}/>
      {/* Create Course button */}
    </div>
  )
}

export default CourseLayout
