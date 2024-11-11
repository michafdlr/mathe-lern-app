'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

function Header() {
  const { isLoaded, user } = useUser();
  return (
    <div className='flex justify-between p-3 shadow-sm'>
      <Image
      src={'/logo.webp'}
      alt='logo'
      width={100}
      height={100}
      />
      {isLoaded && (
        user ? (
          <Link href="/dashboard">
            <Button>Zum Dashboard</Button>
          </Link>
        ) : (
          <Link href="/sign-in">
            <Button>Beginne jetzt</Button>
          </Link>
        )
      )}
    </div>
  )
}

export default Header
