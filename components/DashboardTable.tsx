import React from 'react'
import Moment from 'moment'
import { classNames } from 'utils'

type props = {
  driverData: any
}

const DashboardTable: React.FC<props> = (props) => {
  const { driverData } = props

  return (
    <table className="min-w-full border ">
      <thead className="bg-white border-b shadow">
        <tr className="bg-gray-100 border-blue-20">
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
        {driverData?.data?.trackers?.map(
          ({ id, destination, plate_number, created_at_with_time }) => (
            <tr
              key={id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {Moment(created_at_with_time).format('MMM DD, YYYY')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {destination}
              </td>
              <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r">
                {Moment(created_at_with_time).format('HH:mm:ss')}
              </td>
              <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r">
                {plate_number}
              </td>
              <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r">
                <div className="flex items-center justify-start mb-3">
                  <div className="inline-flex" role="group">
                    <button
                      type="button"
                      className={classNames(
                        'rounded-l inline-block px-3 py-1.5 bg-yellow-500 text-white font-medium text-xs leading-tight',
                        'hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring-0 active:bg-yellow-700',
                        'transition duration-150 ease-in-out'
                      )}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className={classNames(
                        'rounded-r inline-block px-2 py-0.5 bg-red-500 text-white font-medium text-xs leading-tight',
                        'hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-0 active:bg-red-700',
                        'transition duration-150 ease-in-out'
                      )}>
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export default DashboardTable
