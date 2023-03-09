import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Dosis } from '@next/font/google'

const dosis = Dosis({
  subsets: ['latin'],
  weight: ['300','400','500','700']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={dosis.className}>
      <Component {...pageProps} />
    </main>
  )
}
