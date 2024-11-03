"use client"
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import renderContent from '@/utils/renderContent';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard';

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCourse();
  }, [params]);

  const getCourse = async () => {
    try {
      setIsLoading(true);
      const [resultCourse] = await db.select().from(CourseList)
        .where(eq(CourseList?.courseID, params.courseID));
      const resultChapters = await db.select().from(Chapters)
        .where(eq(Chapters?.courseID, params.courseID));

      setCourse(resultCourse);
      setChapters(resultChapters);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className='flex items-center text-4xl justify-center'>
      Inhalt wird geladen...
    </div>;
  }

  return (
    <div>
      <div className='md:w-64 hidden md:block h-screen shadow-sm border-r'>
        <h2 className="text-lg font-medium mb-2 text-white bg-primary p-3">
          {course?.theme}
        </h2>
        {course?.courseOutput?.kapitel?.map((chapter, index) => {
          return (
            <div key={index} className='cursor-pointer hover:bg-primary hover:text-white'>
              <ChapterListCard chapter={chapter} index={index}/>
            </div>
          )
        })}
      </div>
      <div className='md:ml-64'>
        Content
      </div>
    </div>
    // <div className="p-4">
    //   <h1 className="text-2xl font-bold mb-4">{course?.theme}</h1>
    //   <h2 className="text-xl font-semibold mb-2">
    //     {chapters[0]?.content?.detailedDescription[0]?.chapterTitle}
    //   </h2>
    //   <div className="mt-4">
    //     {chapters[0]?.content?.detailedDescription[2]?.content && (
    //       <div className="katex-styles">
    //         {renderContent(chapters[0]?.content?.detailedDescription[2]?.content)}
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}

export default CourseStart
