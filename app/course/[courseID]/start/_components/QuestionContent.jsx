'use client'
import React, { useState } from 'react'
import { HiMiniChevronRight, HiMiniChevronDown } from "react-icons/hi2";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import renderContent from '@/utils/renderContent';
import SolutionContent from './SolutionContent';

function QuestionContent({content}) {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  return (
    <Collapsible
      className='mt-5'
      open={isQuestionOpen}
      onOpenChange={setIsQuestionOpen}
      >
        <CollapsibleTrigger className='text-xl flex gap-1'>
          {isQuestionOpen ? <><HiMiniChevronDown /> Aufgaben</>: <><HiMiniChevronRight /> Aufgaben</> }
        </CollapsibleTrigger>
        <CollapsibleContent>
          {
            content?.content?.excersises.map((excersise, index) => {
              return (
                <div key={index}>
                  <div className='grid-cols-5 justify-between items-center'>
                    <h2 className='w-8 h-8 px-3 flex items-center justify-center rounded-full border flex-none border-black text-md bg-primary text-white'>
                      {index+1}
                    </h2>
                    <div className="katex-styles text-justify col-span-4">
                      {renderContent(excersise.question)}
                    </div>
                  </div>
                  <SolutionContent excersise={excersise}/>
                </div>
              )
            })
          }
        </CollapsibleContent>
      </Collapsible>
  )
}

export default QuestionContent
