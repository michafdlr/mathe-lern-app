'use client'

import SkeletonBasicCourseInfo from '@/app/_skeletons/SkeletonBasicCourseInfo'
import SkeletonChaptersList from '@/app/_skeletons/SkeletonChaptersList'
import SkeletonCourseDetail from '@/app/_skeletons/SkeletonCourseDetail'
import BasicCourseInfo from '@/app/create-course/[courseID]/_components/BasicCourseInfo'
import ChaptersList from '@/app/create-course/[courseID]/_components/ChaptersList'
import CourseDetail from '@/app/create-course/[courseID]/_components/CourseDetail'
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

function Course({ params }) {
  const [course, setCourse] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    params && getCourse();
  }, [params])

  const getCourse = async () => {
    setIsLoading(true);
    const result = await db.select().from(CourseList)
    .where(eq(CourseList?.courseID, params?.courseID));
    setCourse(result[0]);
    setIsLoading(false);
  }
  return (
    <div>
      <DashboardHeader />
      <div className='px-10 p-10 md:px-20 lg:px-40'>
        {isLoading?
        <>
          <SkeletonBasicCourseInfo/>
          <SkeletonCourseDetail/>
          <SkeletonChaptersList/>
        </>
        :
        <>
          <BasicCourseInfo course={course} edit={false} dashboardBtn={true}/>
          <CourseDetail course={course} />
          <ChaptersList course={course} edit={false}/>
        </>
        }
      </div>
    </div>
  )
}

export default Course
