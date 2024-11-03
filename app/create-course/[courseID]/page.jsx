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

  const createFallbackContent = (chapterName) => ({
    title: chapterName,
    detailedDescription: [{
      chapterTitle: "Temporär nicht verfügbar",
      content: `
        <div class="p-4 border-l-4 border-yellow-500 bg-yellow-50">
          <h3>Entschuldigung!</h3>
          <p>Der Inhalt für dieses Kapitel ist zur Zeit nicht verfügbar</p>
        </div>`
    }],
    excersises: [{
      question: "Übungsaufgaben werden generiert...",
      solution: "Die Lösungen werden ebenfalls bald verfügbar sein."
    }],
    links: [{
      url: "https://www.wikipedia.org/wiki/" + encodeURIComponent(chapterName),
      description: "Wikipedia-Artikel"
    }]
  });


  const generateChapterWithRetry = async (chapter, attempt = 1) => {
    const MAX_RETRIES = 5;
    const RETRY_DELAY = 2000 * Math.pow(2, attempt - 1);
    const PROMPT = `Erkläre detailliert die Konzepte, Methoden und Vorgehensweisen mit Übungsaufgaben und durchdachten Lösungen zum Thema: '${course?.theme}', Kapitel: '${chapter.name}', und unter Berücksichtigung der Kapitelbeschreibung: '${chapter.beschreibung}' sowie einer Kapitellänge von etwa '${chapter.dauer}'. Gib deine Ergebnisse im JSON Format mit Feldnamen 'title', 'detailedDescription', 'excersises' als Liste und 'links' als Liste. Jeder der Feldnamen soll nur einmal vorkommen und die Ausageb soll mit dem JSON Formatierer in JavaScript geparsed werden können, es ist also in mathematischen Formeln auf escape-characters zu achten. Stelle sicher, dass mathematische Formeln in HTML gerendert werden können und schön aussehen. Stelle immer sicher, dass das JSON geparsed werden kann!!!`;

    try {
      const result = await generateChapterContent_AI.sendMessage(PROMPT);
      try {
        return JSON.parse(result?.response?.text());
      } catch (error) {
        console.log(`JSON parse error on attempt ${attempt}`);

        if (attempt < MAX_RETRIES) {
          console.log(`Retrying... Attempt ${attempt + 1}/${MAX_RETRIES}`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          return generateChapterWithRetry(chapter, attempt + 1);
        }

        // Return fallback after all retries failed
        return createFallbackContent(chapter.name);
      }
    } catch (error) {
      console.error('AI generation error:', error);
      return createFallbackContent(chapter.name);
    }
  };

  const generateChapterContent = () => {
    setLoading(true);
    const chapters = course?.courseOutput?.kapitel;
    chapters.forEach(async (chapter, index) => {
      // const PROMPT = `Erkläre detailliert die Konzepte, Methoden und Vorgehensweisen mit Übungsaufgaben und durchdachten Lösungen zum Thema: '${course?.theme}', Kapitel: '${chapter.name}', und unter Berücksichtigung der Kapitelbeschreibung: '${chapter.beschreibung}' sowie einer Kapitellänge von etwa '${chapter.dauer}'. Gib deine Ergebnisse im JSON Format mit Feldnamen 'title', 'detailedDescription', 'excersises' als Liste und 'links' als Liste. Jeder der Feldnamen soll nur einmal vorkommen und die Ausageb soll mit dem JSON Formatierer in JavaScript geparsed werden können, es ist also in mathematischen Formeln auf escape-characters zu achten. Stelle sicher, dass mathematische Formeln in HTML gerendert werden können und schön aussehen. Stelle immer sicher, dass das JSON geparsed werden kann!!!`
      // // console.log(PROMPT);
      let videoId;
      try {
        const resp = await service.getVideos(course?.theme + chapter.name);
        videoId = resp[0]?.id?.videoId;
        console.log(videoId);
        const content = await generateChapterWithRetry(chapter);

        await db.insert(Chapters).values({
          chapterID: index,
          courseID: course?.courseID,
          content: content,
          videoID: videoId
        });
        setLoading(false);
      } catch (error) {
        console.log('Video or content generation error:', error);
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
