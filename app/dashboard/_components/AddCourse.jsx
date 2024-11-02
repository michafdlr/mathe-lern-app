'use client'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React, { useContext } from 'react'
import { Skeleton } from "@/components/ui/skeleton"


function AddCourse() {
  const {user, isLoaded} = useUser();
  const {userCourseList, setUserCourseList} = useContext(UserCourseListContext);
  return (
    <div className='flex items-center justify-between'>
      <div className='mx-2'>
        <h1 className='text-secondary md:text-3xl text-xl flex gap-1 items-center'>Hallo {!isLoaded?<Skeleton className="h-8 w-[100px] bg-slate-200" />:<span className='font-bold'>{user?.firstName}</span> }
        </h1>
        <p className='text-sm md:text-justify'>
          Erstelle einen neuen Lernpfad zu einem von dir gewählten Thema oder wähle einen bereits vorhandenen Lernpfad aus und übe weiter.
        </p>
      </div>
      {userCourseList?.length >= 10 ? (
        <Button
          disabled
          className="pointer-events-none cursor-not-allowed opacity-50"
        >
          <span className='text-xl px-1'>+</span> Neuen Kurs erstellen
        </Button>
      ) : (
        <Link href="/create-course">
          <Button>
            <span className='text-xl px-1'>+</span> Neuen Kurs erstellen
          </Button>
        </Link>
      )}
      {/* <Link href={userCourseList?.length<3?'/create-course' : '/dashboard'}>
        <Button disabled={userCourseList?.length >= 3} className={`${userCourseList?.length >= 3 ? 'cursor-not-allowed' : ''}`}>
          <div className={`${userCourseList?.length >= 3 ? 'cursor-not-allowed' : ''}`}>
            <span className='text-xl px-1'>+</span> Neuen Kurs erstellen
          </div>
        </Button>
      </Link> */}
    </div>
  )
}

export default AddCourse
