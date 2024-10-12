import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader'

function CreateCourseLayout({children}) {
  return (
    <div>
      <DashboardHeader />
      {children}
    </div>
  )
}

export default CreateCourseLayout
