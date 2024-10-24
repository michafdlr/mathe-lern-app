//2:54:50
'use client'
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BasicCourseInfo from './_components/BasicCourseInfo';
import CourseDetail from './_components/CourseDetail';
import ChaptersList from './_components/ChaptersList';
import { Button } from '@/components/ui/button';
import { generateChapterContent_AI } from '@/configs/AIModel';
import LoadingDialog from '../_components/LoadingDialog';

function CourseLayout({ params }) {
  const {user} = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    params&&getCourse();
  }, [params, user])

  const getCourse = async () => {
    const result = await db.select().from(CourseList).where(
      and(
        eq(CourseList?.courseID, params?.courseID),
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
    )
    );
    console.log(result[0]);
    setCourse(result[0]);
  }

  const generateChapterContent = () => {
    setLoading(true);
    const chapters = course?.courseOutput?.kapitel;
    chapters.forEach(async (chapter, index) => {
      const PROMPT = `Erkläre detailliert die Konzepte, Methoden und Vorgehensweisen mit Übungsaufgaben und durchdachten Lösungen zum Thema: '${course?.theme}', Kapitel: '${chapter.name}', und unter Berücksichtigung der Kapitelbeschreibung: '${chapter.beschreibung}' sowie einer Kapitellänge von etwa '${chapter.dauer}'. Gib deine Ergebnisse im JSON Format mit Feldnamen 'title', 'detailedDescription', 'excersises' als Liste und 'links' als Liste. Jeder der Feldnamen soll nur einmal vorkommen und die Ausageb soll mit dem JSON Formatierer in JavaScript geparsed werden können, es ist also in mathematischen Formeln auf escape-characters zu achten. Stelle sicher, dass mathematische Formeln in HTML gerendert werden können und schön aussehen.`
      // console.log(PROMPT);
      if (index === 0) {
        try {
          const result = await generateChapterContent_AI.sendMessage(PROMPT);
          console.log(result?.response?.text());
          console.log(JSON.parse(result?.response?.text()));
          setLoading(false); //4:21:21
        } catch (error) {
          console.log('error: ', error);
          setLoading(false);
        }
      }
    });
  }
  return (
    <>
      <div className='mt-10 px-7 md:px-20 lg:px-44'>
        <h2 className='md:text-3xl text-xl font-bold text-secondary text-center'>Lernpfad Vorschlag</h2>

        {/* Basic Info */}
        <BasicCourseInfo course={course} refreshData={() => getCourse()}/>
        {/* Course detail */}
        <CourseDetail course={course} />
        {/* List of Chapters */}
        <ChaptersList course={course} refreshData={() => getCourse()}/>
        {/* Create Course button */}
        <Button className='mb-4'
        onClick={generateChapterContent}
        >Lernpfad erstellen</Button>
      </div>
      <LoadingDialog loading={loading} />
    </>
  )
}

export default CourseLayout
