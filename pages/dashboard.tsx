import { useUserData } from '@nhost/react'
import DashboardLayout from 'layouts/DashboardLayout'
import { NextPage } from 'next'
import React from 'react'
import Image from 'next/image'

const Dashboard: NextPage = () => {
  const user = useUserData()

  return (
    <DashboardLayout metaHead="| Dashboard">
      <main className="min-h-[81vh] px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        <div className="mt-5 flex space-y-3 md:space-y-0 flex-col md:flex-row md:space-x-2 pb-10">
          <div className="flex bg-gray-100 w-full md:w-1/3">
            <div className="bg-white text-center flex-1 border rounded-lg overflow-hidden">
              <div className="py-3 px-6 border-b border-gray-300">Employee</div>
              <div className="p-6">
                <div className="text-center">
                  <Image
                    src={
                      user
                        ? user?.avatarUrl
                        : 'https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7'
                    }
                    width={128}
                    height={128}
                    className="rounded-full w-32 mb-4 mx-auto"
                    alt={user?.displayName}
                  />
                  <h5 className="text-xl font-medium leading-tight mb-2">{user?.displayName}</h5>
                  <p className="text-gray-500 font-medium">Bus Driver</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white w-full border rounded-lg overflow-hidden">
            <div className="py-3 px-6 border-b border-gray-300">Your Track Records</div>
            <div className="flex flex-col p-2">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 min-h-[50vh]">
                  <div className="overflow-hidden">
                    <table className="min-w-full border ">
                      <thead className="bg-white border-b">
                        <tr className="bg-blue-100 border-blue-20">
                          <th
                            scope="col"
                            className="text-sm font-semibold text-gray-900 px-6 py-4 text-left border-r">
                            Date
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-semibold text-gray-900 px-6 py-4 text-left border-r">
                            Destination
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-semibold text-gray-900 px-6 py-4 text-left border-r">
                            Departure Time
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-semibold text-gray-900 px-6 py-4 text-left border-r">
                            Plate number
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-semibold text-gray-900 px-6 py-4 text-left border-r">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            May, 06, 2022
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            Sogod {`->`} Ormoc City
                          </td>
                          <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r">
                            13:01
                          </td>
                          <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r">
                            BBM6540
                          </td>
                          <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r">
                            Delete
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
