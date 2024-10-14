import React from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'



function Options() {
  return (
    <div className='px-10 md:px-20 lg:px-44'>
      <div className='grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-5'>
        <div>
          <Label htmlFor='difficulty'>
            💪Schwierigkeitsgrad:
          </Label>
          <Select id='difficulty'>
            <SelectTrigger className="">
              <SelectValue placeholder="Auswahl" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Leicht</SelectItem>
              <SelectItem value="medium">Mittel</SelectItem>
              <SelectItem value="hard">Schwer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='duration'>
            🕑Länge:
          </Label>
          <Select id='duration'>
            <SelectTrigger className="">
              <SelectValue placeholder="Auswahl" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1hour">1  Stunde</SelectItem>
              <SelectItem value="2hours">2 Stunden</SelectItem>
              <SelectItem value="3hours">Mehr als 2 Stunden</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='video'>
            📺Videos einbeziehen:
          </Label>
          <Select id='video'>
            <SelectTrigger className="">
              <SelectValue placeholder="Auswahl" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Ja</SelectItem>
              <SelectItem value="no">Nein</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='chapters'>
            ⚙️Kapitelanzahl:
          </Label>
          <Input type='number' placeholder='2'/>
        </div>
      </div>
    </div>
  )
}

export default Options
