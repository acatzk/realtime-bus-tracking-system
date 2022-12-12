import React from 'react'

import Schedule from './Schedule'

type props = {
  trackers: any
}

const ScheduleList: React.FC<props> = ({ trackers }): JSX.Element => {
  return (
    <table className="relative w-full table-auto">
      <THead />
      <tbody>{trackers?.map(Schedule)}</tbody>
      {trackers?.length === 0 && <TFoot />}
    </table>
  )
}

function THead() {
  return (
    <thead>
      <tr className="bg-secondary text-center">
        <th
          className="
      w-1/3
      min-w-[160px]
      border-l
      border-transparent
      py-4
      px-3
      text-base
      font-semibold
      text-white
      md:text-lg
      lg:py-7 lg:px-4
    ">
          Driver
        </th>
        <th
          className="
      w-1/3
      min-w-[160px]
      border-l
      border-transparent
      py-4
      px-3
      text-base
      font-semibold
      text-white
      md:text-lg
      lg:py-7 lg:px-4
    ">
          Destination
        </th>
        <th
          className="
      w-1/3
      min-w-[160px]
      border-l
      border-transparent
      py-4
      px-3
      text-base
      font-semibold
      text-white
      md:text-lg
      lg:py-7 lg:px-4
    ">
          Departure Time
        </th>
        <th
          className="
      w-1/3
      min-w-[160px]
      py-4
      px-3
      text-base
      font-semibold
      text-white
      md:text-lg
      lg:py-7
      lg:px-4
    ">
          Plate Number
        </th>
        <th
          className="
      w-1/6
      min-w-[160px]
      py-4
      px-3
      text-base
      font-semibold
      text-white
      md:text-lg
      lg:py-7
      lg:px-4
    ">
          Track Location
        </th>
      </tr>
    </thead>
  )
}

function TFoot() {
  return (
    <tfoot className="border">
      <tr className="bg-gray-200 text-center">
        <td></td>
        <td></td>
        <td
          className="
      w-full
      py-2
      text-sm
      font-semibold
      text-gray-800
    ">
          No Active Driver
        </td>
        <td></td>
        <td></td>
      </tr>
    </tfoot>
  )
}

export default ScheduleList
