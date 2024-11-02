"use client"
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import renderContent from '@/utils/renderContent';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [chapters, setChapters] = useState([]);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{course?.theme}</h1>
      <h2 className="text-xl font-semibold mb-2">
        {chapters[0]?.content?.detailedDescription[0]?.chapterTitle}
      </h2>
      <div className="mt-4">
        {chapters[0]?.content?.detailedDescription[2]?.content && (
          <div className="katex-styles">
            {renderContent(chapters[0]?.content?.detailedDescription[2]?.content)}
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseStart
