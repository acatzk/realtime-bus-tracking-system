import useSWR from 'swr'
import React from 'react'
import moment from 'moment'
import { Spinner } from '~/utils'
import type { NextPage } from 'next'
import { AiOutlineSchedule } from 'react-icons/ai'

import { nhost } from '~/lib/nhost-client'
import PageLayout from '~/components/templates/PageLayout'
import ScheduleList from '~/components/molecules/ScheduleList'
import { GET_DRIVER_LOCATION_BY_CURRENT_DATE } from '~/graphql/queries'
import ScheduleAccordionList from '~/components/molecules/ScheduleAccordionList'

const Index: NextPage = (): JSX.Element => {
  const address = GET_DRIVER_LOCATION_BY_CURRENT_DATE
  const fetcher = async (query: string) =>
    await nhost.graphql.request(query, {
      date_created: moment().format('YYYY-MM-DD')
    })
  const options = {
    refreshInterval: 1000,
    revalidateOnMount: true
  }

  const { data, error } = useSWR(address, fetcher, options)

  if (error)
    return (
      <p className="rounded bg-yellow-300 py-2 px-4 text-center text-sm font-medium">
        Loading failed...
      </p>
    )

  return (
    <PageLayout>
      <main className="mx-auto min-h-[81vh] px-4 md:max-w-2xl md:px-8 lg:max-w-7xl lg:px-16">
        <section className="py-2 md:py-8 lg:py-14">
          <div className="container">
            <div className="flex items-center space-x-2">
              <AiOutlineSchedule className="h-6 w-6 text-gray-700 md:h-8 md:w-8" />
              <h1 className="py-3 text-base font-bold text-gray-700 md:text-xl">
                Daily Bus Schedules
              </h1>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="max-w-full overflow-x-auto">
                  {data ? (
                    <>
                      <div className="hidden md:block">
                        <ScheduleList
                          {...{
                            trackers: data?.data?.trackers,
                            from: 'public'
                          }}
                        />
                      </div>
                      <div className="block md:hidden">
                        {data?.data?.trackers?.length !== 0 ? (
                          <ScheduleAccordionList
                            {...{
                              trackers: data?.data?.trackers,
                              from: 'public'
                            }}
                          />
                        ) : (
                          <h1 className="rounded bg-yellow-300 py-2 px-4 text-center text-sm font-medium">
                            No Active Driver
                          </h1>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center py-10">
                      <Spinner className="h-6 w-6 md:h-8 md:w-8" />
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
