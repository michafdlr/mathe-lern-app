import { Inter } from 'next/font/google'
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

export const metadata = {
  title: "Mathetutor",
  description: "KI-unterstützte Mathe-Lern-App",
  icons: {
    icon: '/favicon.webp',
  },
};

export default function RootLayout({ children }) {
  return (
      <html lang="de">
        <head>
          <link rel="icon" type="image/webp" href="/favicon.webp" />
        </head>
          <body
            className={inter.className}
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
