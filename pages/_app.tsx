import React from 'react'
import 'styles/global.css'
import type { AppProps } from 'next/app'
import { nhost } from 'lib/nhost-client'
import NextProgress from 'utils/next-progress'
import { NhostNextProvider } from '@nhost/nextjs'
import { Slide, ToastContainer } from 'react-toastify'
import { NhostApolloProvider } from '@nhost/react-apollo'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <NextProgress />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Slide}
        />
        <Component {...pageProps} />
      </NhostApolloProvider>
    </NhostNextProvider>
  )
}

export default MyApp
