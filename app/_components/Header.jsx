import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <div className='flex justify-between p-3 shadow-sm'>
      <Image
      src={'/logo.webp'}
      width={100}
      height={100}
      />
      <Button>Beginne jetzt</Button>
    </div>
  )
}

export default Header
