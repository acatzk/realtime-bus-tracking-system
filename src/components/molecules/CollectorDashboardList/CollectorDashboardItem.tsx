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
  const {
    destination,
    departure_time,
    plate_number,
    date_created,
    passengers_aggregate: {
      aggregate: { count: total_number_of_passengers }
    },
    passengers
  } = track

  let sum = 0

  for (const value of passengers) {
    sum += value.amount
  }

  return (
    <tr className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-50">
      <td className="whitespace-nowrap border-r px-6 py-4 text-sm font-medium text-gray-900">
        {Moment(date_created).format('MMM DD, YYYY')}
      </td>
      <td className="whitespace-nowrap border-r px-6 py-4 text-sm font-medium text-gray-900">
        {destination}
      </td>
      <td className="whitespace-nowrap border-r px-6 text-sm font-medium text-gray-900">
        {departure_time}
      </td>
      <td className="whitespace-nowrap border-r px-6 text-sm font-medium text-gray-900">
        {plate_number}
      </td>
      <td className="whitespace-nowrap border-r px-6 text-sm font-medium text-gray-900">
        {total_number_of_passengers}
      </td>
      <td className="whitespace-nowrap border-r px-6 text-sm font-medium text-gray-900">₱{sum}</td>
      <td className="mt-text-sm whitespace-nowrap border-r px-6 font-medium text-gray-900">
        <div className="flex items-center justify-start">
          <div className="inline-flex" role="group">
            <button
              type="button"
              onClick={() => openModal(track)}
              className={classNames(
                'inline-block rounded-l bg-yellow-500 px-3 py-1.5 text-xs font-medium leading-tight text-white',
                'focus:outline-none hover:bg-yellow-600 focus:bg-yellow-600 focus:ring-0 active:bg-yellow-700',
                'transition duration-150 ease-in-out'
              )}>
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleDelete(track)}
              className={classNames(
                'inline-block rounded-r bg-red-500 px-2 py-0.5 text-xs font-medium leading-tight text-white',
                'focus:outline-none hover:bg-red-600 focus:bg-red-600 focus:ring-0 active:bg-red-700',
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
