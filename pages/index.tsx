import React from 'react'
import useSWR from 'swr'
import Moment from 'moment'
import { nhost } from 'lib/nhost-client'
import { NhostClient } from '@nhost/react'
import PageLayout from 'layouts/PageLayout'
import { AiOutlineSchedule } from 'react-icons/ai'
import ScheduleList from 'components/ScheduleList'
import type { GetStaticProps, NextPage } from 'next'
import { GET_DRIVER_LOCATION_BY_CURRENT_DATE } from 'graphql/queries'
import { Spinner } from 'utils'
import ScheduleAccordionList from 'components/ScheduleAccordionList'

type props = {
  initialData: any
}

export const getStaticProps: GetStaticProps = async () => {
  const nhostServer = new NhostClient({
    backendUrl: `${process.env.NEXT_PUBLIC_NHOST_BACKEND}`
  })
  const { data } = await nhostServer.graphql.request(GET_DRIVER_LOCATION_BY_CURRENT_DATE, {
    date_created: Moment().format('YYYY-MM-DD')
  })

  return {
    props: {
      initialData: data
    },
    revalidate: 1
  }
}

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

  if (error)
    return (
      <p className="text-sm font-medium py-2 text-center bg-yellow-300 px-4 rounded">
        Loading failed...
      </p>
    )

  return (
    <PageLayout>
      <main className="min-h-[91vh] px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        <section className="py-2 md:py-8 lg:py-14">
          <div className="container">
            <div className="flex items-center space-x-2">
              <AiOutlineSchedule className="w-6 md:w-8 h-6 md:h-8 text-gray-700" />
              <h1 className="text-base md:text-xl font-bold py-3 text-gray-700">
                Daily Bus Schedules
              </h1>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="max-w-full overflow-x-auto">
                  {data ? (
                    <>
                      <div className="hidden md:block">
                        <ScheduleList trackers={data?.data?.trackers} />
                      </div>
                      <div className="block md:hidden">
                        {data?.data?.trackers?.length !== 0 ? (
                          <ScheduleAccordionList trackers={data?.data?.trackers} />
                        ) : (
                          <h1 className="text-sm font-medium py-2 text-center bg-yellow-300 px-4 rounded">
                            No Active Driver
                          </h1>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center py-10">
                      <Spinner className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                  )}
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
