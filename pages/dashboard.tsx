import DashboardLayout from 'layouts/DashboardLayout'
import { NextPage } from 'next'
import React from 'react'
import { useUserData } from '@nhost/react'
import DashboardTable from 'components/DashboardTable'
import EmployeeProfile from 'components/EmployeeProfile'
import useSWR from 'swr'
import { nhost } from 'lib/nhost-client'
import { GET_TRACKER_RECORDS_BY_USER_ID } from 'graphql/queries'

const Dashboard: NextPage = () => {
  const user = useUserData()

  const { data: driverData } = useSWR(
    GET_TRACKER_RECORDS_BY_USER_ID,
    async (query) =>
      await nhost.graphql.request(query, {
        user_id: user?.id
      }),
    {
      refreshInterval: 1000,
      revalidateOnMount: true
    }
  )

  return (
    <DashboardLayout metaHead="| Dashboard">
      <main className="min-h-[81vh] px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        <div className="mt-5 flex space-y-3 md:space-y-0 flex-col md:flex-row md:space-x-2 pb-10">
          <div className="flex w-full md:w-1/3">
            <EmployeeProfile user={user} />
          </div>
          <div className="bg-white w-full border rounded-lg overflow-hidden">
            <div className="py-3 px-6 border-b border-gray-300">Your Track Records</div>
            <div className="flex flex-col -px-2 -mt-2">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 min-h-[50vh]">
                  <div className="overflow-hidden">
                    <DashboardTable driverData={driverData} />
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
