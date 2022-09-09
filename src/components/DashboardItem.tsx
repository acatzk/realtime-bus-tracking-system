import React from 'react'
import Moment from 'moment'

import { classNames } from '~/helpers/classNames'

type props = {
  track: any
  openModal: Function
  actions: any
}

const DashboardItem: React.FC<props> = ({ track, openModal, actions }): JSX.Element => {
  const { handleDelete } = actions
  const { destination, departure_time, plate_number, date_created } = track

  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
        {Moment(date_created).format('MMM DD, YYYY')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
        {destination}
      </td>
      <td className="text-sm text-gray-900 font-medium px-6 whitespace-nowrap border-r">
        {departure_time}
      </td>
      <td className="text-sm text-gray-900 font-medium px-6 whitespace-nowrap border-r">
        {plate_number}
      </td>
      <td className="mt-text-sm text-gray-900 font-medium px-6 whitespace-nowrap border-r">
        <div className="flex items-center justify-start">
          <div className="inline-flex" role="group">
            <button
              type="button"
              onClick={() => openModal(track)}
              className={classNames(
                'rounded-l inline-block px-3 py-1.5 bg-yellow-500 text-white font-medium text-xs leading-tight',
                'hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring-0 active:bg-yellow-700',
                'transition duration-150 ease-in-out'
              )}>
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleDelete(track)}
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
}

export default DashboardItem
