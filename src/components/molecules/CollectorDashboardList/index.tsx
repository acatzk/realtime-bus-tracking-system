import { mutate } from 'swr'
import { toast } from 'react-toastify'
import React, { useState } from 'react'

import { THead } from './THead'
import { nhost } from '~/lib/nhost-client'
import { direction } from '~/mock/object-list'
import DashboardItem from './CollectorDashboardItem'
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
        <>
          {!myTrackers?.length ? (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="w-full py-2 text-center text-sm text-gray-600">No Data Available</td>
            </tr>
          ) : (
            <>
              {myTrackers?.map((track: any) => (
                <DashboardItem
                  key={track?.id}
                  track={track}
                  actions={{ handleDelete }}
                  openModal={openModal}
                />
              ))}
            </>
          )}
        </>
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

export default DashboardList
