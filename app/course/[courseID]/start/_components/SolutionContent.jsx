'use client'

import React, { useState } from 'react'
import { HiMiniChevronRight, HiMiniChevronDown } from "react-icons/hi2";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import renderContent from '@/utils/renderContent';

function SolutionContent({excersise}) {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  return (
    <Collapsible
    className='mt-5'
    open={isAnswerOpen}
    onOpenChange={setIsAnswerOpen}
    >
      <CollapsibleTrigger className='text-xl flex gap-1 text-secondary italic'>
        {isAnswerOpen ? <><HiMiniChevronDown /> Lösung</>: <><HiMiniChevronRight /> Lösung</> }
      </CollapsibleTrigger>
      <CollapsibleContent className='px-4 mt-1'>
        {renderContent(excersise.solution)}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default SolutionContent
