import React from 'react'
import SubjectList from '../_shared/SubjectList'
import Image from 'next/image'

function SelectSubject() {
  return (
    <div className='flex flex-row justify-between'>
      {SubjectList.map((item, index) => {
        return (
          <div key={item.id} className='flex flex-col p-5 border rounded-md'>
            <Image
              src={item.icon}
              alt={item.name}
              width={75}
              height={75}
              style={{width: '75px', height: 'auto'}}
            />
            <h2 className='text-secondary'>{item.name}</h2>
          </div>
        )
      })}
    </div>
  )
}

export default SelectSubject
