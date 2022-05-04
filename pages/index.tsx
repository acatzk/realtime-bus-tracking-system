import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'
import ScheduleTable from 'components/ScheduleTable'

const Index: NextPage = () => {
  const busSchedule = [
    {
      id: 1,
      avatar:
        'https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=162&h=180&c=7&r=0&o=5&pid=1.7',
      display_name: 'Joshua Galit',
      placeNumber: 'BBM5648',
      longitude: '',
      latitude: '',
    },
    {
      id: 2,
      avatar:
        'https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=162&h=180&c=7&r=0&o=5&pid=1.7',
      display_name: 'Gilchrist Calunia',
      placeNumber: 'LENIKO46242',
      longitude: '',
      latitude: '',
    },
    {
      id: 3,
      avatar:
        'https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=162&h=180&c=7&r=0&o=5&pid=1.7',
      display_name: 'Ken Faller',
      placeNumber: 'SARA4648',
      longitude: '',
      latitude: '',
    },
  ]

  return (
    <React.Fragment>
      <Head>
        <title>Welcome to Davao Metro Shuttle</title>
      </Head>
      <Header />
      <main className="min-h-[91vh] px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        <section className="py-8 lg:py-[120px]">
          <div className="container">
            <h1 className="text-xl font-bold py-3 text-gray-700">
              Daily Bus Schedules
            </h1>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4">
                <div className="max-w-full overflow-x-auto">
                  <ScheduleTable schedules={busSchedule} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default Index
