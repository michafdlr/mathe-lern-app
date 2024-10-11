'use client'
import { Progress } from "@/components/ui/progress"
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { HiHome, HiMiniArrowLeftOnRectangle, HiNewspaper } from "react-icons/hi2";

function SideBar() {
  const Menu = [
    {
      id: 1,
      name: 'Home',
      icon: <HiHome />,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Entdecken',
      icon: <HiNewspaper />,
      path: '/dashboard/explore'
    },
    {
      id: 3,
      name: 'Logout',
      icon: <HiMiniArrowLeftOnRectangle />,
      path: '/dashboard/logout'
    }
  ]
  const path = usePathname();

  return (
    <div className='fixed md:w-64 h-full p-5 shadow-md'>
      <Image
        src="/logo.webp"
        alt='logo'
        width={140}
        height={50}
      />
      <hr className='my-5'/>
      <ul className='gap-y-4'>
        {Menu.map((item) => {
          return (
            <Link href={item.path} key={item.id} className={`flex flex-row gap-x-2 p-5 text-gray-600 hover:bg-primary hover:rounded-md hover:text-secondary ${item.path == path && 'bg-primary rounded-md'}`}>
              <div className='text-2xl'>
                {item.icon}
              </div>
              {item.name}
            </Link>
          )
        })}
      </ul>
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={20} className=' shadow-inner border-solid border-2 border-gray-400'/>
        <h2 className="text-center text-gray-600 text-sm">
          2 von 10 Kursen beendet
        </h2>
      </div>
    </div>
  )
}

export default SideBar
