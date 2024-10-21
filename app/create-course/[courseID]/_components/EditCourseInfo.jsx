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



function EditCourseInfo({ course, onCourseUpdate }) {
  const [themeName, setThemeName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setThemeName(course?.theme);
    setDescription(course?.courseOutput?.beschreibung);
  }, [course])

  const onUpdateHandler = async() => {
    course.theme = themeName;
    course.courseOutput.beschreibung = description;
    const updatedCourse = {
      ...course,
      theme: themeName,
      courseOutput: {
        ...course.courseOutput,
        beschreibung: description,
      },
    };
    const result = await db.update(CourseList).set({
      theme: updatedCourse.theme,
      courseOutput: updatedCourse.courseOutput
    }).where(eq(updatedCourse.courseID, CourseList.courseID)).returning({id: CourseList.id});
    onCourseUpdate(updatedCourse); //3:42:40
  }

  return (
    <Dialog>
      <DialogTrigger><HiPencilSquare className='md:text-2xl text-xl'/></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Titel und Beschreibung ändern</DialogTitle>
          <DialogDescription>
            Hier kannst Du den Kurstitel und die Beschreibung ändern.
          </DialogDescription>
        </DialogHeader>
        <div>
          <label htmlFor="change-title">Kurstitel ändern:</label>
          <Input
          id={'change-title'}
          defaultValue={course?.theme}
          onChange = {(event) => {
            setThemeName(event.target.value);
          }}
          />
        </div>
        <div>
          <label htmlFor="change-description">Beschreibung ändern:</label>
          <Textarea
          id={'change-description'}
          rows="4"
          defaultValue={course?.courseOutput?.beschreibung}
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

export default EditCourseInfo
