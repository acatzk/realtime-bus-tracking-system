import React from 'react'
import PageLayout from 'layouts/pageLayout'
import { NextPage } from 'next'

const Login: NextPage = () => {
  return (
    <PageLayout metaHead="| Login">
      <main className="min-h-[91vh] px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        Login Page
      </main>
    </PageLayout>
  )
}

export default Login
