'use client'
import React, { useState } from 'react'
import { HiMiniChevronRight, HiMiniChevronDown } from "react-icons/hi2";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import SingleQuestionContent from './SingleQuestionContent';

function QuestionContent({content}) {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  return (
    <Collapsible
      className='mt-5'
      open={isQuestionOpen}
      onOpenChange={setIsQuestionOpen}
      >
        <CollapsibleTrigger className='text-2xl flex gap-1 text-primary '>
          {isQuestionOpen ? <><HiMiniChevronDown /> <span className='font-bold'>Aufgaben</span></>: <><HiMiniChevronRight /> Aufgaben</> }
        </CollapsibleTrigger>
        <CollapsibleContent className='px-2'>
          {
            content?.content?.excersises.map((excersise, index) => {
              return (
                <div key={index}>
                  <div className='flex gap-2 justify-between items-center'>
                    <SingleQuestionContent excersise={excersise} index={index}/>
                  </div>
                </div>
              )
            })
          }
        </CollapsibleContent>
      </Collapsible>
  )
}

export default QuestionContent
