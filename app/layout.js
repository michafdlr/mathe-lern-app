import { Inter, Varela_Round } from 'next/font/google'
import "./globals.css";
import { ClerkProvider, GoogleOneTap } from '@clerk/nextjs';
import { deDE } from '@clerk/localizations'

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const varelaRound = Varela_Round({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export const metadata = {
  title: "Mathetutor",
  description: "KI-unterstützte Mathe-Lern-App",
  icons: {
    icon: '/favicon-color.png',
  },
};

export default function RootLayout({ children }) {
  return (
      <html lang="de">
        <head>
          <link rel="icon" type="image/png" href="/favicon-color.png" />
        </head>
          <body
            className={varelaRound.className}
          >
            <ClerkProvider
            localization={deDE}
            appearance={{
                variables: {
                  colorPrimary: '#26b5c7',
                  colorText: 'black',
                  colorSuccess: 'rgb(100,200,100)',
                  colorNeutral: '#ff4c4c',
                  colorDanger: 'red',
                  colorWarning: 'rgb(250,175,20)',
                  colorTextSecondary: 'rgb(50,50,50)',
                  borderRadius: '0.5rem',
                },
                layout: {
                  logoImageUrl: '/logo.webp',
                }
              }}>
              <GoogleOneTap />
              {children}
            </ClerkProvider>
          </body>
      </html>
  );
}
