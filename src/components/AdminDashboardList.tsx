import React from 'react'
import { MapIcon } from '@heroicons/react/solid'

import { classNames } from '~/helpers/classNames'

type Props = {}

const AdminDashboardList: React.FC<Props> = (props): JSX.Element => {
  return (
    <table className="min-w-full border-b ">
      <THead />
      <tbody>
        <tr className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-50">
          <td className="whitespace-nowrap border-r px-6 py-4 text-sm font-medium text-gray-900">
            James Bond
          </td>
          <td className="whitespace-nowrap border-r px-6 py-4 text-sm font-medium text-gray-900">
            Dec 11, 2022
          </td>
          <td className="whitespace-nowrap border-r px-6 py-4 text-sm font-medium text-gray-900">
            {`Sogod -> Benit`}
          </td>
          <td className="whitespace-nowrap border-r px-6 text-sm font-medium text-gray-900">
            02:36
          </td>
          <td className="whitespace-nowrap border-r px-6 text-sm font-medium text-gray-900">
            54545
          </td>
          <td className="whitespace-nowrap border-r px-6 text-sm font-medium text-gray-900">302</td>
          <td className="whitespace-nowrap border-r px-6 text-sm font-medium text-gray-900">
            P 21,523
          </td>
          <td className="mt-text-sm whitespace-nowrap border-r px-6 font-medium text-gray-900">
            <div className="flex items-center justify-start">
              <div className="inline-flex" role="group">
                <button
                  type="button"
                  className={classNames(
                    'inline-block rounded-full px-2 py-0.5 text-xs font-semibold leading-tight text-blue-600 hover:underline',
                    'flex items-center transition duration-150 ease-in-out'
                  )}>
                  <MapIcon className="mr-2 h-5 w-5" /> View Live Map
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
    <thead className="border-b bg-white shadow">
      <tr className="border-blue-20 bg-gray-100">
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Driver Name
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Date
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Destination
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Departure Time
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Plate number
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          No. Passenger
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Total Earnings
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Options
        </th>
      </tr>
    </thead>
  )
}

export default AdminDashboardList
