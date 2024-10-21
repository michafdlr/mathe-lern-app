import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { HiPencilSquare } from "react-icons/hi2";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

function EditChapter({ course, onCourseUpdate, index }) {
  const [chapterName, setChapterName] = useState();
  const [description, setDescription] = useState();
  const [duration, setDuration] = useState();

  useEffect(() => {
    setChapterName(course?.courseOutput?.kapitel[index]?.name);
    setDescription(course?.courseOutput?.kapitel[index]?.beschreibung);
    setDuration(course?.courseOutput?.kapitel[index]?.dauer);
  }, [course])

  const onUpdateHandler = async() => {
    const updatedChapters = course.courseOutput.kapitel.map((chapter, i) =>
      i === index ? { ...chapter, name: chapterName, beschreibung: description, dauer: duration } : chapter
    );
    const updatedCourse = {
      ...course,
      courseOutput: {
        ...course.courseOutput,
        kapitel: updatedChapters,
      },
    };
    const result = await db.update(CourseList).set({
      courseOutput: updatedCourse.courseOutput
    }).where(eq(updatedCourse.courseID, CourseList.courseID)).returning({id: CourseList.id});
    onCourseUpdate(updatedCourse); //3:42:40
  }
  return (
    <Dialog>
      <DialogTrigger><HiPencilSquare className='md:text-2xl text-xl'/></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kapitel, Beschreibung und Dauer ändern</DialogTitle>
          <DialogDescription>
            Hier kannst Du den Kapitelname, die Beschreibung und Dauer ändern.
          </DialogDescription>
        </DialogHeader>
        <div>
          <label htmlFor="change-chapter-title">Kapitelname ändern:</label>
          <Input
          id={'change-chapter-title'}
          defaultValue={course?.courseOutput?.kapitel[index]?.name}
          onChange = {(event) => {
            setChapterName(event.target.value);
          }}
          />
        </div>
        <div>
          <label htmlFor="change-chapter-duration">Dauer ändern:</label>
          <Input
          id={'change-chapter-duration'}
          defaultValue={course?.courseOutput?.kapitel[index]?.dauer}
          onChange = {(event) => {
            setDuration(event.target.value);
          }}
          />
        </div>
        <div>
          <label htmlFor="change-chapter-description">Beschreibung ändern:</label>
          <Textarea
          id={'change-chapter-description'}
          rows="4"
          defaultValue={course?.courseOutput?.kapitel[index]?.beschreibung}
          onChange = {(event) => {
            setDescription(event.target.value);
          }}
          ></Textarea>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
            className='text-center'
            onClick = {onUpdateHandler}
            >
              Speichern
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditChapter
