import type { NextPage } from 'next'
import React from 'react'
import ScheduleTable from 'components/ScheduleTable'
import PageLayout from 'layouts/PageLayout'
import { AiOutlineSchedule } from 'react-icons/ai'

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
    <PageLayout>
      <main className="min-h-[91vh] px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        <section className="py-8 lg:py-14">
          <div className="container">
            <div className="flex items-center space-x-2">
              <AiOutlineSchedule className="w-6 md:w-8 h-6 md:h-8 text-gray-700" />
              <h1 className="text-base md:text-xl font-bold py-3 text-gray-700">
                Daily Bus Schedules
              </h1>
            </div>
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
    </PageLayout>
  )
}

export default Index
