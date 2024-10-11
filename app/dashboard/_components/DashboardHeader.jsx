import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='shadow-sm flex justify-between items-center p-2'>
      <Image
        src={'/logo.png'}
        alt='logo'
        width={30}
        height={30}
      />
      <UserButton />
    </div>
  )
}

export default DashboardHeader
