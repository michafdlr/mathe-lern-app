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
          <Label htmlFor='difficulty'>
            💪Schwierigkeitsgrad:
          </Label>
          <Select
          id='difficulty'
          onValueChange={(value) => {
            handleOptionsChange('difficulty', value)
          }}>
            <SelectTrigger className="">
              <SelectValue placeholder="Auswahl" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="leicht">Leicht</SelectItem>
              <SelectItem value="mittel">Mittel</SelectItem>
              <SelectItem value="schwer">Schwer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='duration'>
            🕑Länge:
          </Label>
          <Select
          id='duration'
          onValueChange={(value) => {
            handleOptionsChange('duration', value)
          }}>
            <SelectTrigger className="">
              <SelectValue placeholder="Auswahl" />
            </SelectTrigger>
            <SelectContent>
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
          id='video'
          onValueChange={(value) => {
            handleOptionsChange('videos', value)
          }}>
            <SelectTrigger className="">
              <SelectValue placeholder="Auswahl" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ja">Ja</SelectItem>
              <SelectItem value="nein">Nein</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='chapters'>
            ⚙️Kapitelanzahl:
          </Label>
          <Input
          type='number'
          placeholder='2'
          onChange={(event) => {
            handleOptionsChange('chapters', event.target.value) //2:08
          }}/>
        </div>
      </div>
    </div>
  )
}

export default Options
