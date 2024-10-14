import React, { useContext } from 'react'
import SubjectList from '@/app/_shared/SubjectList'
import Image from 'next/image'
import { UserInputContext } from '@/app/_context/UserInputContext'

function SelectSubject() {
  const {userCourseInput, setUserCourseInput} = useContext(UserInputContext);
  const handleSubjectChange = (subject) => {
    setUserCourseInput(prev => ({
      ...prev,
      subject: subject
    }))
  };

  return (
    <div className='px-5 md:px-10'>
      <h2 className='md:text-2xl text-xl'>Wähle die Kategorie</h2>
      <div className='grid mt-5 md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-10'>
      {SubjectList.map((item, index) => {
        return (
          <div
          key={item.id}
          className={`flex flex-col justify-center items-center p-5 border-2 border-black rounded-lg shadow-sm shadow-secondary cursor-pointer hover:bg-cyan-100 hover:text-secondary hover:scale-105 duration-200 ${userCourseInput?.subject == item.name && 'bg-primary text-secondary'}`}
          onClick={() => handleSubjectChange(item.name)}
          >
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
