import React, { useContext } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { UserInputContext } from '@/app/_context/UserInputContext'



function Options() {
  const {userCourseInput, setUserCourseInput} = useContext(UserInputContext);
  const handleOptionsChange = (fieldName, value) => {
    setUserCourseInput(prev => ({
      ...prev,
      [fieldName]: value
    }))
  };
  return (
    <div className='px-10 md:px-20 lg:px-44'>
      <div className='grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-5'>
        <div>
          <label htmlFor='difficulty'>
            💪Schwierigkeitsgrad:
          </label>
          <Select
          defaultValue={userCourseInput?.difficulty}
          onValueChange={(value) => {
            handleOptionsChange('difficulty', value)
          }}>
            <SelectTrigger className="" id='difficulty'>
              <SelectValue
              placeholder="Auswahl"
              />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="leicht">Leicht</SelectItem>
              <SelectItem value="mittel">Mittel</SelectItem>
              <SelectItem value="schwer">Schwer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor='duration'>
            🕑Länge:
          </label>
          <Select
          defaultValue={userCourseInput?.duration}
          onValueChange={(value) => {
            handleOptionsChange('duration', value)
          }}>
            <SelectTrigger className="" id='duration'>
              <SelectValue placeholder="Auswahl" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="1 Stunde">1  Stunde</SelectItem>
              <SelectItem value="2 Stunden">2 Stunden</SelectItem>
              <SelectItem value="mehr als 2 Stunden">Mehr als 2 Stunden</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='video'>
            📺Videos einbeziehen:
          </Label>
          <Select
          defaultValue={userCourseInput?.videos}
          onValueChange={(value) => {
            handleOptionsChange('videos', value)
          }}>
            <SelectTrigger className="" id='video'>
              <SelectValue placeholder="Auswahl" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ja">Ja</SelectItem>
              <SelectItem value="nein">Nein</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor='chapters'>
            ⚙️Kapitelanzahl:
          </label>
          <Input
          id='chapters'
          type='number'
          placeholder='2'
          defaultValue={userCourseInput?.chapters}
          onChange={(event) => {
            handleOptionsChange('chapters', event.target.value) //2:08
          }}/>
        </div>
      </div>
    </div>
  )
}

export default Options
