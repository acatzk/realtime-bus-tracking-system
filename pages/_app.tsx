import 'styles/tailwind.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { nhost } from 'lib/nhost-client'
import { NhostNextProvider } from '@nhost/nextjs'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <ToastContainer />
      <Component {...pageProps} />
    </NhostNextProvider>
  )
}

export default MyApp
