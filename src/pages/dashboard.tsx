import useSWR from 'swr'
import React from 'react'
import Moment from 'moment'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FiPlus } from 'react-icons/fi'
import { useUserData } from '@nhost/react'

import { Spinner } from '~/utils/Icons'
import { nhost } from '~/lib/nhost-client'
import { classNames } from '~/helpers/classNames'
import ProfileCard from '~/components/molecules/ProfileCard'
import { GET_TRACKER_RECORDS_BY_USER_ID } from '~/graphql/queries'
import DashboardLayout from '~/components/templates/DashboardLayout'
import DashboardList from '~/components/molecules/CollectorDashboardList'

const Dashboard: NextPage = (): JSX.Element => {
  const user = useUserData()
  const router = useRouter()

  const address = GET_TRACKER_RECORDS_BY_USER_ID
  const fetcher = async (query: string) =>
    await nhost.graphql.request(query, {
      user_id: user?.id,
      date_created: Moment().format('YYYY-MM-DD')
    })
  const options = {
    refreshInterval: 1000,
    revalidateOnMount: true
  }

  const { data: driverData } = useSWR(address, fetcher, options)

  return (
    <DashboardLayout metaHead="| Dashboard">
      <main className="mx-auto min-h-[81vh] px-4 md:max-w-2xl md:px-8 lg:max-w-7xl lg:px-16">
        <div className="mt-5 flex flex-col space-y-3 pb-10 md:flex-row md:space-y-0 md:space-x-2">
          <div className="flex w-full md:w-1/3">
            <ProfileCard user={user} />
          </div>
          <div className="w-full overflow-hidden rounded-lg border bg-white">
            <div className="flex items-center justify-between border-b border-gray-300 py-3 px-5">
              <h2 className="font-medium">Your Track Records</h2>
              <button
                type="button"
                onClick={() => router.push('/track-bus')}
                className={classNames(
                  'inline-block rounded bg-green-500 px-2 py-1.5 text-xs font-medium leading-tight text-white',
                  'focus:outline-none hover:bg-green-600 focus:bg-green-600 focus:ring-0 active:bg-green-700',
                  'transition duration-150 ease-in-out',
                  'flex items-center space-x-0.5'
                )}>
                <FiPlus className="h-4 w-4" />
                <span>Track</span>
              </button>
            </div>
            <div className="-px-2 -mt-2 flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="max-h-[50vh] overflow-y-auto scrollbar-w-2 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    {driverData ? (
                      <DashboardList myTrackers={driverData?.data?.trackers} />
                    ) : (
                      <div className="flex items-center justify-center py-10">
                        <Spinner className="h-6 w-6 md:h-8 md:w-8" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  )
}

export default Dashboard
