import renderContent from '@/utils/renderContent'
import React from 'react'
import QuestionContent from './QuestionContent';
import YouTube from 'react-youtube';
import LinkList from './LinkList';

const opts = {
  height: '300',
  width: '500',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};


function ChapterContent({ chapter, content }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-secondary">{chapter?.name}</h1>
      <p className='text-gray-500'>{chapter?.beschreibung}</p>
      {content?.videoID && <div className='flex justify-center my-4'>
        <YouTube
          videoId={content?.videoID}
          opts={opts}
        />
      </div>}
      <div className="mt-4">
        {content?.content?.detailedDescription.map((paragraph, index) => {
          return (
            <div className='bg-cyan-50 my-4 rounded-lg p-4' key={index}>
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
        <LinkList content={content}/>
      </div>
      <div className='mt-4 border-t-2 border-black'>
        <QuestionContent content={content}/>
      </div>
    </div>
  )
}

export default ChapterContent
