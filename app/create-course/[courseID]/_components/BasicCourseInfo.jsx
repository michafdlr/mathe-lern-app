import { Button } from '@/components/ui/button';
// import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HiOutlineAcademicCap } from "react-icons/hi2";
import EditCourseInfo from './EditCourseInfo';
import { storage } from '@/configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

function BasicCourseInfo({ course, refreshData }) {
  const [updatedCourse, setUpdatedCourse] = useState(course);

  useEffect(() => {
    setUpdatedCourse(course);
  }, [course]);

  const handleCourseUpdate = (updatedCourse) => {
    setUpdatedCourse(updatedCourse);
  };

  const [selectedFile, setSelectedFile] = useState();
  const onFileUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    const fileName = Date.now()+".jpg"
    const storageReference = ref(storage, 'matheimages/'+fileName);
    await uploadBytes(storageReference, file).then((snapshot) =>{
      console.log(`Fileupload of ${file} complete`);
    }).then(resp => {
      getDownloadURL(storageReference)
        .then(async(downloadUrl)=> {
          console.log(downloadUrl);
          await db.update(CourseList).set({
            courseBanner: downloadUrl
          }).where(eq(updatedCourse?.courseID, CourseList.courseID)) //4:11:05
        });
    });
  }
  return (
    <div className='mt-5 p-8 border shadow-md rounded-xl'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <h3 className='text-xl md:text-2xl text-primary'>
            {updatedCourse?.theme} {updatedCourse && <EditCourseInfo course={updatedCourse} onCourseUpdate={handleCourseUpdate} refreshData={() => refreshData(true)}/>}
          </h3>
          <p className='mt-2 text-justify text-sm text-gray-500'>
            {updatedCourse?.courseOutput?.beschreibung}
          </p>
          <h3 className='font-medium mt-2 flex flex-row gap-2 items-center text-primary'><HiOutlineAcademicCap /> {course?.subject}</h3>
          <Button className='w-full mt-4'>Start</Button>
        </div>
        <div className='flex justify-center'>
          <label htmlFor="upload-image">
            <img src={selectedFile?selectedFile:course?.courseBanner} alt="Kursbild"
            className='w-full rounded-xl border-black border-2 object-scale-down cursor-pointer h-[250px]'/>
          </label>
          <input type="file" id='upload-image' className='opacity-0 w-0 h-0'
          onChange={onFileUpload}/>
          {/* <Image
          src={"/placeholder.png"}
          width={200}
          height={200}
          alt='placeholder image'
          // style={{width: "250px", height: "200px"}}
          className='w-full rounded-xl border-2 border-black h-[200px] object-cover'
          /> */}
        </div>
      </div>
    </div>
  )
}

export default BasicCourseInfo
