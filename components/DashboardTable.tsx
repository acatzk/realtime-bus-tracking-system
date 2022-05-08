import React, { useState } from 'react'
import Moment from 'moment'
import { classNames } from 'utils'
import UpdateTrackerDialog from './UpdateTrackerDialog'
import { UPDATE_DRIVER_BY_PK_ID } from 'graphql/mutations'
import { nhost } from 'lib/nhost-client'
import { direction } from 'mock/object-list'
import { mutate } from 'swr'
import { toast } from 'react-toastify'
import { useUserData } from '@nhost/react'

type props = {
  driverData: any
}

const DashboardTable: React.FC<props> = (props) => {
  const user = useUserData()
  const { driverData } = props
  const [isOpen, setIsOpen] = useState(false)
  const [track, setTrack] = useState(false)
  const [selected, setSelected] = useState(direction[0])

  const closeModal = () => setIsOpen(false)
  const openModal = (track) => {
    setIsOpen(true)
    setTrack(track)
  }

  const handleSubmitUpdateForm = async ({ id, plate_number }) => {
    const {
      data: { update_trackers }
    } = await nhost.graphql.request(UPDATE_DRIVER_BY_PK_ID, {
      id,
      plate_number,
      destination: selected?.name.toString()
    })

    mutate({ ...update_trackers })
    toast.success(`Successfully Updated.`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
    closeModal()
  }

  return (
    <table className="min-w-full border-b ">
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
        {driverData?.data?.trackers?.map((track) => (
          <tr
            key={track.id}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
              {Moment(track?.created_at_with_time).format('MMM DD, YYYY')}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
              {track?.destination}
            </td>
            <td className="text-sm text-gray-900 font-medium px-6 whitespace-nowrap border-r">
              {Moment(track?.created_at_with_time).format('HH:mm:ss')}
            </td>
            <td className="text-sm text-gray-900 font-medium px-6 whitespace-nowrap border-r">
              {track?.plate_number}
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
        ))}
        <UpdateTrackerDialog
          isOpen={isOpen}
          closeModal={closeModal}
          track={track}
          onSubmitForm={handleSubmitUpdateForm}
          selected={selected}
          setSelected={setSelected}
        />
      </tbody>
    </table>
  )
}

export default DashboardTable
