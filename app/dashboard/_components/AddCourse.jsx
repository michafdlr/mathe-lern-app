'use client'
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'

function AddCourse() {
  const {user} = useUser();
  return (
    <div className='flex items-center justify-between'>
      <div className='mx-2'>
        <h1 className='text-secondary md:text-3xl text-xl'>Hallo <span className='font-bold'>{user?.fullName}</span></h1>
        <p className='text-sm md:text-justify'>
          Erstelle einen neuen Lernpfad zu einem von dir gewählten Thema oder wähle einen bereits vorhandenen Lernpfad aus und übe weiter.
        </p>
      </div>
      <Link href='/create-course'>
        <Button>
          <span className='text-xl px-1'>+</span> Neuen Kurs erstellen
        </Button>
      </Link>
    </div>
  )
}

export default AddCourse
