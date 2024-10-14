import React from 'react'
import SubjectList from '../_shared/SubjectList'
import Image from 'next/image'

function SelectSubject() {
  return (
    <div>
      <h2 className='text-center md:text-2xl text-xl'>Wähle die Kategorie</h2>
      <div className='grid mt-10 md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-10 px-5 md:px-10'>
      {SubjectList.map((item, index) => {
        return (
          <div key={item.id} className='flex flex-col justify-center items-center p-5 border-2 border-black rounded-lg shadow-sm shadow-secondary cursor-pointer hover:bg-cyan-100 hover:text-secondary hover:scale-105 duration-200'>
            <Image
              src={item.icon}
              alt={item.name}
              width={100}
              height={100}
              style={{width: '100px', height: 'auto'}}
            />
            <h2 className='mt-2'>{item.name}</h2>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default SelectSubject
