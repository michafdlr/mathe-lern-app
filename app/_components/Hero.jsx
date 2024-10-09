import { Button } from '@/components/ui/button'
import React from 'react'

function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-2xl font-extrabold text-primary sm:text-5xl">
            Der Mathetutor für dein Abitur
            <br />
            <strong className="font-extrabold text-black sm:block"> Trainiere deine Mathe-Fähigkeiten, unerstützt durch KI</strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
          Erstelle deine eigenen Lernkurse zur Vorbereitung auf das Abitur oder einfach zum Lernen und Üben. Nutze KI um deine Lernfortschritte zu optimieren und deine Schwächen zu identifizieren.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {/* <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              Beginne jetzt
            </a> */}
            <Button>Beginne jetzt</Button>
          </div>
        </div>
      </div>
</section>
  )
}

export default Hero
