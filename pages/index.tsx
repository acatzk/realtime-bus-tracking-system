import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Header from 'components/Header'

const Index: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Welcome to Davao Metro Shuttle</title>
      </Head>
      <Header />
    </React.Fragment>
  )
}

export default Index
