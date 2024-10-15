'use client'
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { HiMiniRectangleStack, HiMiniCog8Tooth, HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import SelectSubject from './_components/SelectSubject';
import Description from './_components/Description';
import Options from './_components/Options';
import { UserInputContext } from '../_context/UserInputContext';
import { useContext } from 'react';

function CreateCourse() {
  const stepperOptions = [
    {
      id: 1,
      name: "Kategorie",
      icon: <HiMiniRectangleStack />
    },
    {
      id: 2,
      name: "Beschreibung",
      icon: <HiMiniAdjustmentsHorizontal />
    },
    {
      id: 3,
      name: "Optionen",
      icon: <HiMiniCog8Tooth />
    }
  ]

  const {userCourseInput, setUserCourseInput} = useContext(UserInputContext);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log(userCourseInput); //2:03:19
  }, [userCourseInput])

  return (
    <>
      <div className='flex flex-col items-center mt-8'>
        <h1 className='md:text-4xl text-2xl text-secondary'>
          Erstelle einen neuen Lernpfad
        </h1>

        {/* Stepper */}
        <div className='flex mt-10'>
          {stepperOptions.map((item, index) => {
            return (
              <div className='flex items-center' key={item.id}>
                <div className='flex flex-col items-center mx-4 w-[50px] md:w-[100px]'>
                  <div className={`bg-gray-400 p-3 rounded-full text-white ${activeIndex>=index && 'bg-primary'}`}>
                    {item.icon}
                  </div>
                  <h2 className='hidden md:text-sm md:block'>{item.name}</h2>
                </div>
                {index != stepperOptions?.length-1 && <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-400 ${activeIndex>=index+1 && 'bg-primary'}`}></div>}
              </div>
            )
          })}
        </div>
      </div>

      <div className='px-10 md:px-20 lg:px-44 mt-8'>
      {/* Components */}
        {activeIndex==0 ? <SelectSubject /> :
        activeIndex == 1 ? <Description /> :
        <Options />}
      {/* Next and Previous Button */}
        <div className='flex justify-between mt-10'>
          <Button
            disabled={activeIndex==0}
            variant='outline'
            onClick={() => {
                if (activeIndex>0) {
                  setActiveIndex(activeIndex-1)
                }
              }}>
            Zurück
          </Button>
          {activeIndex<stepperOptions?.length-1 && <Button disabled={activeIndex==stepperOptions?.length-1} onClick={() => {
            if (activeIndex<stepperOptions?.length-1) {
              setActiveIndex(activeIndex+1)
            }
            }}>
              Weiter
          </Button>}
          {activeIndex == stepperOptions?.length-1 && <Button>
            Vorschlag erstellen
          </Button>}
        </div>
      </div>
    </>
  )
}

export default CreateCourse
