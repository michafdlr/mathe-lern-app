'use client'
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Progress } from "@/components/ui/progress"
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react'
import { HiHome, HiMiniArrowLeftOnRectangle, HiNewspaper } from "react-icons/hi2";
import { SignOutButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";

function SideBar() {
  const {userCourseList, setUserCourseList} = useContext(UserCourseListContext);
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
    // {
    //   id: 3,
    //   name: 'Logout',
    //   icon: <HiMiniArrowLeftOnRectangle />,
    //   path: '/'
    // }
  ]
  const path = usePathname();
  return (
    <div className='fixed md:w-64 h-full p-5 shadow-md'>
      <Image
        src="/logo.webp"
        alt='logo'
        width={140}
        height={50}
        style={{width: 'auto', height: 'auto'}}
      />
      <hr className='my-5'/>
      <ul className='gap-y-4'>
        {Menu.map((item) => {
          return (
            <Link href={item.path} key={item.id} className={`flex flex-row gap-x-2 p-5 text-gray-600 hover:bg-primary hover:rounded-md hover:text-secondary mb-2 ${item.path == path && 'bg-primary rounded-md text-secondary'}`}>
              <div className='text-2xl'>
                {item.icon}
              </div>
              {item.name}
            </Link>
          )
        })}
        <div className="p-5">
          <SignOutButton redirectUrl="/">
            <Button variant='secondary'> <HiMiniArrowLeftOnRectangle /> Ausloggen</Button>
          </SignOutButton>
        </div>
      </ul>
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={userCourseList?.length*10} className=' shadow-inner border-solid border-2 border-gray-400'/>
        <h2 className="text-center text-gray-600 text-sm">
          {userCourseList?.length} von 10 Lernpfaden erstellt
        </h2>
      </div>
    </div>
  )
}

export default SideBar
