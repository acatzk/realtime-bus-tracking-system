import useSWR from 'swr'
import moment from 'moment'
import { NextPage } from 'next'
import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import { useAuthenticationStatus, useUserData } from '@nhost/react'

import { Spinner } from '~/utils'
import { nhost } from '~/lib/nhost-client'
import AdminLayout from '~/layouts/AdminLayout'
import { AiOutlineSchedule } from 'react-icons/ai'
import ScheduleList from '~/components/ScheduleList'
import { GET_DRIVER_LOCATION_BY_CURRENT_DATE } from '~/graphql/queries'
import ScheduleAccordionList from '~/components/ScheduleAccordionList'

const Schedules: NextPage = (): JSX.Element => {
  const router = useRouter()
  const user = useUserData()

  const { isAuthenticated } = useAuthenticationStatus()

  // Check if user is authenticated
  React.useEffect(() => {
    if (!isAuthenticated || user?.defaultRole !== 'admin') {
      router.push('/')
    }
  }, [isAuthenticated])

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
    <AdminLayout metaTitle="Schedules">
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
                      <ScheduleList trackers={data?.data?.trackers} />
                    </div>
                    <div className="block md:hidden">
                      {data?.data?.trackers?.length !== 0 ? (
                        <ScheduleAccordionList trackers={data?.data?.trackers} />
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
    </AdminLayout>
  )
}

export default Schedules
