import Link from 'next/link'
import React from 'react'
import { HiArrowTopRightOnSquare } from "react-icons/hi2";


function LinkList({ content }) {
  return (
    <div>
      <h2 className='text-xl text-primary my-2'>Zusätzliche Links:</h2>
      <p className='text-sm mt-2 text-gray-500'><span className='text-yellow-500'>Achtung:</span> Da die Kurse mit KI erstellt wurden, kann es sein, dass verschiedene Links nicht (mehr) funktionieren.</p>
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
