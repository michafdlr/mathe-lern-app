import React from 'react'
import { HiClock } from "react-icons/hi2";



function ChapterListCard({ chapter, index }) {
  return (
    <div className='p-2 grid grid-cols-5 gap-1 justify-between items-center border-b'>
      <h2 className='w-8 h-8 px-3 flex items-center justify-center rounded-full border flex-none border-black text-md bg-primary text-white'>
        {index+1}
      </h2>
      <div className='text-md col-span-4'>
        <h2 className='text-md'>
          {chapter.name}
        </h2>
        <h2 className='text-sm italic flex items-center gap-2 text-secondary'>
          <HiClock /> {chapter.dauer}
        </h2>
      </div>
    </div>
  )
}

export default ChapterListCard
