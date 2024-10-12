'use client'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { HiMiniRectangleStack, HiMiniCog8Tooth, HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

function CreateCourse() {
  const stepperOptions = [
    {
      id: 1,
      name: "Thema",
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

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='flex flex-col justify-center items-center mt-8'>
      <h1 className='md:text-4xl text-2xl text-secondary'>
        Erstelle einen neuen Lernpfad
      </h1>

      {/* Stepper */}
      <div className='flex mt-10'>
        {stepperOptions.map((item, index) => {
          return (
            <div className='flex items-center' key={index}>
              <div className='flex flex-col items-center mx-4 w-[50px] md:w-[100px]'>
                <div className={`bg-gray-400 p-3 rounded-full text-white ${activeIndex>=index && 'bg-[#26b5c7]'}`}>
                  {item.icon}
                </div>
                <h2 className='hidden md:text-sm md:block'>{item.name}</h2>
              </div>
              {index != stepperOptions?.length-1 && <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-400 ${activeIndex>=index+1 && 'bg-[#26b5c7]'}`}></div>}
            </div>
          )
        })}
      </div>

      {/* Components */}

      {/* Next and Previous Button */}
      <div className='flex justify-between items-center'>
        <Button onClick={() => {
          setActiveIndex(activeIndex+1)
          }}>
            Weiter
        </Button>
        <Button onClick={() => setActiveIndex(activeIndex-1)}>
          Zurück
        </Button>
      </div>
    </div>
  )
}

export default CreateCourse
