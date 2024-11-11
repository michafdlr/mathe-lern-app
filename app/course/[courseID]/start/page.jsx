"use client"
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard';
import ChapterContent from './_components/ChapterContent';
import LoadingContent from './_components/LoadingContent';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
      <LoadingContent loading={isLoading}/>
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
        <Link href='/dashboard' className='flex items-center justify-center mt-4 hover:bg-primary hover:text-white m-4 rounded-md'>
          Zurück zum Dashboard
        </Link>
      </div>
      <div className='md:ml-64'>
        {selectedChapter ? <ChapterContent chapter={selectedChapter} content={chapterCont} /> : <div className='flex text-3xl justify-center items-center p-10'>Wähle ein Kapitel</div>}
      </div>
    </div>
  );
}

export default CourseStart
