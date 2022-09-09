import React from 'react'

import Schedule from './Schedule'

type props = {
  trackers: any
}

const ScheduleList: React.FC<props> = ({ trackers }): JSX.Element => {
  return (
    <table className="table-auto w-full relative">
      <THead />
      <tbody>{trackers?.map(Schedule)}</tbody>
      {trackers?.length === 0 && <TFoot />}
    </table>
  )
}

function THead() {
  return (
    <thead>
      <tr className="bg-[#3f3a83] text-center">
        <th
          className="
      w-1/3
      min-w-[160px]
      text-base
      md:text-lg
      font-semibold
      text-white
      py-4
      lg:py-7
      px-3
      lg:px-4
      border-l border-transparent
    ">
          Driver
        </th>
        <th
          className="
      w-1/3
      min-w-[160px]
      text-base
      md:text-lg
      font-semibold
      text-white
      py-4
      lg:py-7
      px-3
      lg:px-4
      border-l border-transparent
    ">
          Destination
        </th>
        <th
          className="
      w-1/3
      min-w-[160px]
      text-base
      md:text-lg
      font-semibold
      text-white
      py-4
      lg:py-7
      px-3
      lg:px-4
      border-l border-transparent
    ">
          Departure Time
        </th>
        <th
          className="
      w-1/3
      min-w-[160px]
      text-base
      md:text-lg
      font-semibold
      text-white
      py-4
      lg:py-7
      px-3
      lg:px-4
    ">
          Plate Number
        </th>
        <th
          className="
      w-1/6
      min-w-[160px]
      text-base
      md:text-lg
      font-semibold
      text-white
      py-4
      lg:py-7
      px-3
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
      text-sm
      font-semibold
      text-gray-800
      py-2
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
