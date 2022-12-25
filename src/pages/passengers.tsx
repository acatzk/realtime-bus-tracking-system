import useSWR from 'swr'
import React from 'react'
import moment from 'moment'
import { NextPage } from 'next'
import { useUserData } from '@nhost/react'

import { nhost } from '~/lib/nhost-client'
import { GET_TRACK_IF_EXIST_AND_STATUS } from '~/graphql/queries'
import PassengersForm from '~/components/molecules/PassengersForm'
import DashboardLayout from '~/components/templates/DashboardLayout'

const Passengers: NextPage = (): JSX.Element => {
  const user = useUserData()

  // Check the current Status and check if exist
  const address = GET_TRACK_IF_EXIST_AND_STATUS
  const fetcher = async (query: string) =>
    await nhost.graphql.request(query, {
      user_id: user?.id,
      date_created: moment().format('YYYY-MM-DD')
    })
  const options = {
    refreshInterval: 1000,
    revalidateOnMount: true
  }
  const { data: driverData } = useSWR(address, fetcher, options)

  const isActiveDriverStatus = driverData?.data?.trackers[0]?.isActive
  const track_id = driverData?.data?.trackers[0]?.id

  return (
    <DashboardLayout metaHead="| Track Me">
      <main className="mx-auto min-h-[81vh] px-4 pb-8 md:max-w-2xl md:px-8 lg:max-w-7xl lg:px-16">
        <div className="mx-auto mt-8 max-w-lg">
          <h1 className="text-center text-lg font-bold">Add New Passenger</h1>
          <PassengersForm
            {...{
              isActiveDriverStatus,
              track_id
            }}
          />
        </div>
      </main>
    </DashboardLayout>
  )
}

export default Passengers
