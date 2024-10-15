import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { UserInputContext } from '@/app/_context/UserInputContext'
import { useContext } from 'react'




function Description() {
  const {userCourseInput, setUserCourseInput} = useContext(UserInputContext);
  const handleDescriptionChange = (fieldName, value) => {
    setUserCourseInput(prev => ({
      ...prev,
      [fieldName]: value
    }))
  };
  return (
    <div  className='mx-10 md:mx-20'>
      {/* topic input */}
      <div className='mt-5'>
        <Label htmlFor="theme">
          🔍Unterthema, zu dem ein Lernpfad erstellt werden soll (z.B. Nullstellen, Extrempunkte, Integralrechnung):
        </Label>
        <Input
        id='theme'
        type='text'
        placeholder={'Nullstellenberechnung'}
        onChange={(event) => {
          handleDescriptionChange('theme', event.target.value)
        }}/>
      </div>

      {/* description */}
      <div className='mt-8'>
        <Label htmlFor='description'>
          📝Gib an, was bei der Erstellung des Lernpfads berücksichtigt, eingebaut und speziell beachtet werden soll (optional):
        </Label>
        <Textarea
        id='description'
        placeholder='Erstelle einen Kurs zum obigen Thema, dabei soll zunächst erklärt werden, was Nullstellen sind, wie diese berechnet werden können und Anwendungsbeispiele gegeben werden. Zu jedem Kapitel sollen Übungsaufgaben erstellt werden...'
        onChange={(event) => {
          handleDescriptionChange('description', event.target.value)
        }}/>
      </div>
    </div>
  )
}

export default Description
