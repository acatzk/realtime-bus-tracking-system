import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'

const Index: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Welcome to Davao Metro Shuttle</title>
      </Head>
      <Header />
      <main className="min-h-[91vh]"></main>
      <Footer />
    </React.Fragment>
  )
}

export default Index
