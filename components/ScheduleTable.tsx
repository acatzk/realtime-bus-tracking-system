import React from 'react'
import Image from 'next/image'
import Moment from 'moment'
import Link from 'next/link'
import { FaMapMarkedAlt } from 'react-icons/fa'

type props = {
  data?: any
}

const ScheduleTable: React.FC<props> = (props) => {
  const trackers = props?.data?.data?.trackers

  return (
    <table className="table-auto w-full relative">
      <thead className="fixed">
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
      <tbody>
        {trackers?.map(({ id, user, plate_number, destination, departure_time }) => (
          <tr key={id}>
            <td
              className="
                  text-center text-dark
                  font-medium
                  text-sm
                  md:text-base
                  py-5
                  px-2
                  bg-[#F3F6FF]
                  border-b border-l border-[#E8E8E8]
                  flex flex-col md:flex-row items-center space-x-1 md:space-x-3 justify-center
                ">
              <div className="relative">
                <Image
                  src={user?.avatarUrl}
                  width={44}
                  height={44}
                  className="rounded-full border"
                  alt="avatar"
                />
              </div>
              <span>{user?.displayName}</span>
            </td>
            <td
              className="
                  text-center text-dark
                  text-sm
                  md:text-base
                  font-semibold
                  py-5
                  px-2
                  bg-white
                  border-b border-[#E8E8E8]
                ">
              {destination}
            </td>
            <td
              className="
                  text-center text-dark
                  text-sm
                  md:text-base
                  font-semibold
                  py-5
                  px-2
                  bg-[#F3F6FF]
                  border-b border-[#E8E8E8]
                ">
              {departure_time}
            </td>
            <td
              className="
                  text-center text-dark
                  text-sm
                  md:text-base
                  font-semibold
                  py-5
                  px-2
                  bg-white
                  border-b border-[#E8E8E8]
                ">
              {plate_number}
            </td>
            <td
              className="
                  text-center
                  text-sm
                  md:text-base
                  font-semibold
                  py-5
                  px-2
                  bg-[#F3F6FF]
                  border-b border-[#E8E8E8]
                ">
              <Link href={`/map/${id}`}>
                <a className="flex  justify-center space-x-2 text-sm hover:underline text-blue-500">
                  <FaMapMarkedAlt className="w-5 h-5" />
                  <span>View Live Map</span>
                </a>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
      {trackers?.length === 0 && (
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
      )}
    </table>
  )
}

export default ScheduleTable
