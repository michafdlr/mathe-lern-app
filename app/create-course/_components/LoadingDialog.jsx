import React from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'


function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className='flex flex-col items-center w-1/2'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-primary text-lg'>KI erstellt gerade deinen Kurs...</AlertDialogTitle>
          <AlertDialogDescription className='flex flex-col items-center'>
              <Image
              unoptimized
              src={'/loader.gif'}
              alt='loading gif'
              width={100}
              height={100}
              style={{width: '100px', height: 'auto'}}
              />
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LoadingDialog
