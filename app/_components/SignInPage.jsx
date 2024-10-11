'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Image from 'next/image'

export default function SignInPage() {
  return (
    <SignIn.Root>
      <SignIn.Step
        name="start"
        className="bg-white w-96 rounded-2xl py-10 px-8 shadow-md shadow-secondary border space-y-6"
      >
        <div className='flex justify-center'>
          <Image
            src="/logo.webp"
            width={100}
            height={100}
            />
        </div>
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold text-primary">
            Beim <strong className='text-secondary'>Mathetutor</strong> einloggen
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-x-4">
          <Clerk.Connection
            name="google"
            className="flex items-center gap-x-1 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-lg"
          >
            <Clerk.Icon className="size-4" />
            Google
          </Clerk.Connection>
          <Clerk.Connection
            name="github"
            className="flex items-center gap-x-1 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md"
          >
            <Clerk.Icon className="size-4" />
            GitHub
          </Clerk.Connection>
          <Clerk.Connection
            name="apple"
            className="flex items-center gap-x-1 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md"
          >
            <Clerk.Icon className="size-4" />
            Apple
          </Clerk.Connection>
        </div>
        <Clerk.Field name="identifier" className="space-y-2">
          <Clerk.Label className="text-sm font-medium">
            Email
          </Clerk.Label>
          <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5" />
          <Clerk.FieldError className="block text-red-500 text-sm" />
        </Clerk.Field>
        <div className='flex items-center justify-center'>
          <SignIn.Action submit className="bg-primary text-white rounded-md py-1.5 px-2.5 flex items-center">
            Mit Email einloggen
          </SignIn.Action>
        </div>
        <div className='flex flex-col justify-center'>
          <div className="flex w-full items-center space-x-4">
            <div className="flex-1 border-b border-primary"></div>
            <div className='p-x-2'>
              Oder
            </div>
            <div className="flex-1 border-b border-primary"></div>
          </div>
            <SignIn.Strategy name="passkey">
              <SignIn.Action submit className="bg-primary text-white rounded-md py-1.5 px-2.5 flex items-center">
                Mit Passkey einloggen
              </SignIn.Action>
            </SignIn.Strategy>
        </div>
      </SignIn.Step>

      <SignIn.Step name="verifications">
        <SignIn.Strategy name="password">
          <Clerk.Field name="password">
            <Clerk.Label>Passwort</Clerk.Label>
            <Clerk.Input />
            <Clerk.FieldError />
          </Clerk.Field>
          <SignIn.Action submit>Einloggen</SignIn.Action>
        </SignIn.Strategy>
        <SignIn.Action navigate="forgot-password">Passwort zurücksetzen</SignIn.Action>
        <SignIn.Action navigate="start">Nutze eine andere Methode</SignIn.Action>
      </SignIn.Step>


      <SignIn.Step name="forgot-password">
        <SignIn.SupportedStrategy name="reset_password_email_code">
          Passwort mit Email zurücksetzen
        </SignIn.SupportedStrategy>
        <p>oder</p>
        <SignIn.SupportedStrategy name="google">Mit Google einloggen</SignIn.SupportedStrategy>
      </SignIn.Step>

      <SignIn.Step name="choose-strategy">
        <SignIn.Strategy name="passkey">Mit Passkey einloggen</SignIn.Strategy>
      </SignIn.Step>
    </SignIn.Root>
  )
}
