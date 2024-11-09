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

function SingleQuestionContent({excersise, index}) {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  return (
    <Collapsible
    className='mt-5 bg-rose-50 p-2 rounded-lg'
    open={isQuestionOpen}
    onOpenChange={setIsQuestionOpen}
    >
      <CollapsibleTrigger className='text-xl flex gap-1'>
        {isQuestionOpen ? <><HiMiniChevronDown /> Aufgabe {index+1}</>: <><HiMiniChevronRight /> Aufgabe {index+1}</> }
      </CollapsibleTrigger>
      <CollapsibleContent className='px-4 my-2'>
        {renderContent(excersise.question)}
        <SolutionContent excersise={excersise}/>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default SingleQuestionContent
