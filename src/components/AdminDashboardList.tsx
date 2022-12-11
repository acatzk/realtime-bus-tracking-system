import React from 'react'
import { MapIcon } from '@heroicons/react/solid'

import { classNames } from '~/helpers/classNames'

type Props = {}

const AdminDashboardList: React.FC<Props> = (props): JSX.Element => {
  return (
    <table className="min-w-full border-b ">
      <THead />
      <tbody>
        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
            James Bond
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
            Dec 11, 2022
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
            {`Sogod -> Benit`}
          </td>
          <td className="text-sm text-gray-900 font-medium px-6 whitespace-nowrap border-r">
            02:36
          </td>
          <td className="text-sm text-gray-900 font-medium px-6 whitespace-nowrap border-r">
            54545
          </td>
          <td className="text-sm text-gray-900 font-medium px-6 whitespace-nowrap border-r">302</td>
          <td className="text-sm text-gray-900 font-medium px-6 whitespace-nowrap border-r">
            P 21,523
          </td>
          <td className="mt-text-sm text-gray-900 font-medium px-6 whitespace-nowrap border-r">
            <div className="flex items-center justify-start">
              <div className="inline-flex" role="group">
                <button
                  type="button"
                  className={classNames(
                    'rounded-full inline-block px-2 py-0.5 text-blue-600 hover:underline font-semibold text-xs leading-tight',
                    'transition duration-150 ease-in-out flex items-center'
                  )}>
                  <MapIcon className="mr-2 w-5 h-5" /> View Live Map
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

function THead() {
  return (
    <thead className="bg-white border-b shadow">
      <tr className="bg-gray-100 border-blue-20">
        <th
          scope="col"
          className="text-sm font-semibold text-gray-900 px-6 py-4 text-left border-r">
          Driver Name
        </th>
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
          No. Passenger
        </th>
        <th
          scope="col"
          className="text-sm font-semibold text-gray-900 px-6 py-4 text-left border-r">
          Total Earnings
        </th>
        <th
          scope="col"
          className="text-sm font-semibold text-gray-900 px-6 py-4 text-left border-r">
          Options
        </th>
      </tr>
    </thead>
  )
}

export default AdminDashboardList
