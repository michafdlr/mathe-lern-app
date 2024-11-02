//2:54:50
'use client'
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BasicCourseInfo from './_components/BasicCourseInfo';
import CourseDetail from './_components/CourseDetail';
import ChaptersList from './_components/ChaptersList';
import { Button } from '@/components/ui/button';
import { generateChapterContent_AI } from '@/configs/AIModel';
import LoadingDialog from '../_components/LoadingDialog';
import service from '@/configs/service';
import { useRouter } from 'next/navigation';

function CourseLayout({ params }) {
  const {user} = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [calls, setCalls] = useState(0);
  const router = useRouter();

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

  // const sleep = (t) => new Promise(r => setTimeout(r, t))
  // const callPrompt = async (prompt) => {
  //   if (calls < 5) {
  //     setCalls(calls+1);
  //     try {
  //       const result = await generateChapterContent_AI.sendMessage(prompt);
  //       const content = JSON.parse(result?.response?.text());
  //       console.log('success generating chapter content');
  //       return content
  //     } catch (error) {
  //       console.log('failed with error ', error, 5-calls, ' calls left.');
  //       await sleep(2000);
  //       callPrompt(prompt);
  //     }
  //   }
  //   return JSON.parse(JSON.stringify({
  //     title: "",
  //     detailedDescription: "",
  //     excersises: [],
  //     links: []
  //   }))
  // }

  const generateChapterContent = () => {
    setLoading(true);
    const chapters = course?.courseOutput?.kapitel;
    chapters.forEach(async (chapter, index) => {
      const PROMPT = `Erkläre detailliert die Konzepte, Methoden und Vorgehensweisen mit Übungsaufgaben und durchdachten Lösungen zum Thema: '${course?.theme}', Kapitel: '${chapter.name}', und unter Berücksichtigung der Kapitelbeschreibung: '${chapter.beschreibung}' sowie einer Kapitellänge von etwa '${chapter.dauer}'. Gib deine Ergebnisse im JSON Format mit Feldnamen 'title', 'detailedDescription', 'excersises' als Liste und 'links' als Liste. Jeder der Feldnamen soll nur einmal vorkommen und die Ausageb soll mit dem JSON Formatierer in JavaScript geparsed werden können, es ist also in mathematischen Formeln auf escape-characters zu achten. Stelle sicher, dass mathematische Formeln in HTML gerendert werden können und schön aussehen. Stelle immer sicher, dass das JSON geparsed werden kann!!!`
      // console.log(PROMPT);
      try {
        let videoId;
        service.getVideos(course?.theme + chapter.name).then(resp => {
          videoId = resp[0]?.id?.videoId;
          console.log(videoId);
        })
        const result = await generateChapterContent_AI.sendMessage(PROMPT);
        let content;
        try {
          content = JSON.parse(result?.response?.text());
        } catch (error) {
          content = JSON.parse(JSON.stringify({
            title: chapter.name,
            detailedDescription: [],
            excersises: [],
            links: []
          }));
          console.log(error, 'instead using', content);
        }

        await db.insert(Chapters).values({
          chapterID: index,
          courseID: course?.courseID,
          content: content,
          videoID: videoId
        });
        setLoading(false);
      } catch (error) {
        console.log('error: ', error);
        setLoading(false);
      }
      await db.update(CourseList).set({
        published: true
      }).where(eq(course?.courseID, CourseList.courseID));

      router.replace('/create-course/'+course?.courseID+'/finish')
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
