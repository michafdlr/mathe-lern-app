import Link from 'next/link'
import React from 'react'
import { HiArrowTopRightOnSquare } from "react-icons/hi2";


function LinkList({ content }) {
  return (
    <div>
      <h2 className='text-xl text-primary my-2'>Zusätzliche Links:</h2>
      {content?.content?.links?.map((link, index) => {
        return (
        <div key={index} className='my-2'>
          <Link href={link.url} className='italic underline' target='_blank'>
            <h2 className='flex gap-2 items-center'> <HiArrowTopRightOnSquare /> {link.description}</h2>
          </Link>
        </div>
        )
      })}
    </div>
  )
}

export default LinkList
