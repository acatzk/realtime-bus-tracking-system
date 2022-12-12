import { mutate } from 'swr'
import { toast } from 'react-toastify'
import React, { useState } from 'react'

import { nhost } from '~/lib/nhost-client'
import DashboardItem from './DashboardItem'
import { direction } from '~/mock/object-list'
import EditTrackerDialog from './EditTrackerDialog'
import { DELETE_DRIVER_BY_PK_ID, UPDATE_DRIVER_BY_PK_ID } from '~/graphql/mutations'

type props = {
  myTrackers: any
}

const DashboardList: React.FC<props> = (props): JSX.Element => {
  const { myTrackers } = props
  const [isOpen, setIsOpen] = useState(false)
  const [trackData, setTracktrackData] = useState({})
  const [selected, setSelected] = useState(direction[0])

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = (track: any) => {
    setTracktrackData(track)
    setIsOpen(true)
  }

  const handleUpdate = async ({
    id,
    departure_time,
    plate_number
  }: {
    id: number
    departure_time: string
    plate_number: string
  }) => {
    const {
      data: { update_trackers_by_pk }
    } = await nhost.graphql.request(UPDATE_DRIVER_BY_PK_ID, {
      id,
      plate_number,
      departure_time,
      destination: selected?.name.toString()
    })

    mutate({ ...update_trackers_by_pk })
    toast.success(`Successfully Updated.`)
    closeModal()
  }

  const handleDelete = async (track: any) => {
    let result = confirm('Want to delete?')
    if (result) {
      const result = await nhost.graphql.request(DELETE_DRIVER_BY_PK_ID, {
        id: track?.id
      })
      if (result) {
        toast.success(`Successfully Deleted.`)
      }
    }
  }

  return (
    <table className="min-w-full border-b ">
      <THead />
      <tbody>
        {myTrackers?.map((track: any) => (
          <DashboardItem
            key={track?.id}
            track={track}
            actions={{ handleDelete }}
            openModal={openModal}
          />
        ))}
        <EditTrackerDialog
          isOpen={isOpen}
          closeModal={closeModal}
          track={trackData}
          actions={{ handleUpdate }}
          selected={selected}
          setSelected={setSelected}
        />
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
          No. Passengers
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

export default DashboardList
