"use client"
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard';
import ChapterContent from './_components/ChapterContent';

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [chapterCont, setChapterCont] = useState([]);
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
      setCourse(resultCourse);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedChapterContent = async (chapterID) => {
    try {
      setIsLoading(true);
      const resultChapter = await db.select().from(Chapters)
        .where(and(eq(Chapters?.courseID, params.courseID), eq(Chapters?.chapterID, chapterID)));
      setChapterCont(resultChapter[0]);
      console.log('content:', resultChapter[0]);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className='flex gap-2'>
        <div className='md:w-64 hidden h-screen shadow-sm border-r'></div>
        <div className='text-4xl justify-center'>
        Inhalt wird geladen...
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='fixed md:w-64 hidden md:block h-screen shadow-sm border-r'>
        <h2 className="text-lg font-medium mb-2 text-white bg-primary p-3">
          {course?.theme}
        </h2>
        {course?.courseOutput?.kapitel?.map((chapter, index) => {
          return (
            <div key={index}
            className={`cursor-pointer hover:bg-primary hover:text-white ${selectedChapter?.name == chapter.name && 'bg-primary text-white'}`}
            onClick={() => {
              setSelectedChapter(chapter);
              getSelectedChapterContent(index);
              console.log('chapter:', chapter);
              }}>
              <ChapterListCard chapter={chapter} index={index}/>
            </div>
          )
        })}
      </div>
      <div className='md:ml-64'>
        <ChapterContent chapter={selectedChapter} content={chapterCont} />
      </div>
    </div>
  );
}

export default CourseStart
