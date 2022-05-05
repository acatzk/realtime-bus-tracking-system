import 'styles/tailwind.css'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { nhost } from 'lib/nhost-client'
import { NhostNextProvider } from '@nhost/nextjs'
import { ToastContainer } from 'react-toastify'
import { NhostApolloProvider } from '@nhost/react-apollo'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <ToastContainer />
        <Component {...pageProps} />
      </NhostApolloProvider>
    </NhostNextProvider>
  )
}

export default MyApp
