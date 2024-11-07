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
      <CollapsibleTrigger className='text-xl flex gap-1'>
        {isAnswerOpen ? <><HiMiniChevronDown /> Lösung</>: <><HiMiniChevronRight /> Lösung</> }
      </CollapsibleTrigger>
      <CollapsibleContent>
        {renderContent(excersise.solution)}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default SolutionContent
