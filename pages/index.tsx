import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import React from 'react'
import ScheduleTable from 'components/ScheduleTable'
import PageLayout from 'layouts/PageLayout'
import { AiOutlineSchedule } from 'react-icons/ai'
import { GET_DRIVER_LOCATION_BY_CURRENT_DATE } from 'graphql/queries'
import useSWR from 'swr'
import { nhost } from 'lib/nhost-client'
import Moment from 'moment'

type props = {
  initialData: any
}

// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
//   const initialData = await fetch(GET_DRIVER_LOCATION_BY_CURRENT_DATE, {})
//   nhost.graphql.request(GET_DRIVER_LOCATION_BY_CURRENT_DATE, {
//     date_created: Moment().format('YYYY-MM-DD')
//   })

//   return {
//     props: {
//       initialData
//     },
//     revalidate: 1
//   }
// }

const Index: NextPage<props> = ({ initialData }) => {
  const address = GET_DRIVER_LOCATION_BY_CURRENT_DATE
  const fetcher = async (query) =>
    await nhost.graphql.request(query, {
      date_created: Moment().format('YYYY-MM-DD')
    })
  const options = {
    initialData,
    refreshInterval: 1000,
    revalidateOnMount: true
  }

  const { data, error } = useSWR(address, fetcher, options)

  if (error) <p>Loading failed...</p>

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
                  <ScheduleTable data={data} />
                  {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
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
