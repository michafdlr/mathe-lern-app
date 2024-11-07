import renderContent from '@/utils/renderContent'
import React from 'react'
import QuestionContent from './QuestionContent';


function ChapterContent({ chapter, content }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-secondary">{chapter?.name}</h1>
      <p className='text-gray-500'>{chapter?.beschreibung}</p>
      <div className="mt-4">
        {content?.content?.detailedDescription.map((paragraph, index) => {
          return (
            <div className='mt-4' key={index}>
              <h3 className='text-xl text-primary'>
                {paragraph.chapterTitle}
              </h3>
              <div className="katex-styles text-justify">
                {renderContent(paragraph.content)}
              </div>
            </div>
          )
        })}
      </div>
      <div className='mt-4'>
        <QuestionContent content={content}/>
      </div>
    </div>
  )
}

export default ChapterContent
