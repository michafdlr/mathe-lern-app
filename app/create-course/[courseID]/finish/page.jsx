'use client'

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import BasicCourseInfo from '../_components/BasicCourseInfo';
import { HiMiniDocumentDuplicate } from "react-icons/hi2";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link';
import { Button } from '@/components/ui/button';


function FinishScreen({ params }) {
  const {user} = useUser();
  const [course, setCourse] = useState([]);
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  }

  useEffect(() => {
    params && getCourse();
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

  return (
    <div className='px-10 md:px-20 lg:px-40'>
      <h2 className='text-xl md:text-2xl text-center my-3 font-bold text-secondary'>
        Dein Kurs wurde erstellt! 🥳
      </h2>
      <BasicCourseInfo course={course} refreshData={() => console.log()} edit={false}/>
      <h2 className='mt-3'>Kurs-URL:</h2>
      <h2 className='flex justify-between items-center text-gray-500 border rounded-md p-2'>
        {process.env.NEXT_PUBLIC_HOST_NAME}/course/{course?.courseID}/start
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HiMiniDocumentDuplicate
              className='h-5 w-5 flex-none cursor-pointer hover:brightness-125'
              onClick={async () => {
                handleClick();
                await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course?.courseID}/start`)
              }}
              />
              {showMessage && (<div className='text-xs absolute bg-primary border rounded-sm text-white p-1 cursor-default'>Link kopiert</div>)}
            </TooltipTrigger>
            <TooltipContent>
              <p>Link kopieren</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h2>
      <Link href={'/dashboard'}>
          <Button className='w-full mt-4'>Zum Dashboard</Button>
      </Link>
    </div>
  )
}

export default FinishScreen
