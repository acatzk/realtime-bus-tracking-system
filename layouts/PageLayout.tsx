import React from 'react'
import Head from 'next/head'
import Footer from 'components/Footer'
import Header from 'components/Header'

export type props = {
  children: React.ReactNode
  metaHead?: string
}

const PageLayout: React.FC<props> = (props) => {
  const { children, metaHead } = props

  return (
    <React.Fragment>
      <Head>
        <title>Davao Metro Shuttle {metaHead}</title>
      </Head>
      <div className="antialiased">{children}</div>
      <Footer />
    </React.Fragment>
  )
}

export default PageLayout
