import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useAuthenticationStatus, useUserData } from '@nhost/react'

import AdminLayout from '~/layouts/AdminLayout'
import handleImageError from '~/helpers/handleImageError'
import AdminDashboardList from '~/components/AdminDashboardList'

const Dashboard: NextPage = (): JSX.Element => {
  const router = useRouter()
  const user = useUserData()

  const { isAuthenticated } = useAuthenticationStatus()

  // Check if user is authenticated
  React.useEffect(() => {
    if (!isAuthenticated || user?.defaultRole !== 'admin') {
      router.push('/')
    }
  }, [isAuthenticated])

  return (
    <AdminLayout metaTitle="Dashboard">
      <div className="mt-5 flex flex-col space-y-3 pb-10 md:flex-row md:space-y-0 md:space-x-2">
        <div className="flex w-full md:w-1/3">
          <div className="flex-1 bg-white text-center">
            <div className="overflow-hidden rounded-lg border">
              <div className="border-b border-gray-300 py-3 px-6">Administrator</div>
              <div className="p-6">
                <div className="text-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7"
                    className="mx-auto mb-4 w-32 rounded-full"
                    onError={(e) =>
                      handleImageError(
                        e,
                        'https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7'
                      )
                    }
                    alt=""
                  />
                  <h5 className="mb-2 text-xl font-medium leading-tight">Admin</h5>
                  <p className="font-medium text-gray-500">Administrator</p>
                </div>
              </div>
              <div className="border-t border-gray-300 bg-gray-50 py-3 px-6 text-sm">
                Clemrose Bus Inc.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-lg border bg-white">
          <div className="flex items-center justify-between border-b border-gray-300 py-3 px-5">
            <h2 className="font-medium">Employee's Track Records</h2>
          </div>
          <div className="-px-2 -mt-2 flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="max-h-[50vh] overflow-y-auto scrollbar-w-2 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                  <AdminDashboardList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard
