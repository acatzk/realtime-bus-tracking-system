import React, { useState } from 'react'
import EditTrackerDialog from './EditTrackerDialog'
import { DELETE_DRIVER_BY_PK_ID, UPDATE_DRIVER_BY_PK_ID } from 'graphql/mutations'
import { nhost } from 'lib/nhost-client'
import { direction } from 'mock/object-list'
import { mutate } from 'swr'
import { toast } from 'react-toastify'
import DashboardItem from './DashboardItem'

type props = {
  myTrackers: any
}

const DashboardList: React.FC<props> = (props) => {
  const { myTrackers } = props
  const [isOpen, setIsOpen] = useState(false)
  const [trackData, setTracktrackData] = useState({})
  const [selected, setSelected] = useState(direction[0])

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = (track) => {
    setTracktrackData(track)
    setIsOpen(true)
  }

  const handleUpdate = async ({ id, departure_time, plate_number }) => {
    const {
      data: { update_trackers_by_pk }
    } = await nhost.graphql.request(UPDATE_DRIVER_BY_PK_ID, {
      id,
      plate_number,
      departure_time,
      destination: selected?.name.toString()
    })

    mutate({ ...update_trackers_by_pk })
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

  const handleDelete = async (track) => {
    let result = confirm('Want to delete?')
    if (result) {
      const result = await nhost.graphql.request(DELETE_DRIVER_BY_PK_ID, {
        id: track?.id
      })
      if (result) {
        toast.success(`Successfully Deleted.`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      }
    }
  }

  return (
    <table className="min-w-full border-b ">
      <THead />
      <tbody>
        {myTrackers?.map((track) => (
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
          Options
        </th>
      </tr>
    </thead>
  )
}

export default DashboardList
