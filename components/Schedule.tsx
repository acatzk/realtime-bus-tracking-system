import React from 'react'
import Image from 'next/image'
import Moment from 'moment'
import Link from 'next/link'
import { FaMapMarkedAlt } from 'react-icons/fa'

type props = {
  id: string
  user: any
  departure_time: string
  destination: string
  plate_number: string
}

const Schedule: React.FC<props> = ({ id, user, departure_time, plate_number, destination }) => {
  const { avatarUrl, displayName } = user

  return (
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
            src={avatarUrl}
            width={44}
            height={44}
            className="rounded-full border"
            alt="avatar"
          />
        </div>
        <span>{displayName}</span>
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
  )
}

export default Schedule
