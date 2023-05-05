import React from 'react'
import Moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { FaMapMarkedAlt } from 'react-icons/fa'

type props = {
  id: string
  user: any
  departure_time: string
  destination: string
  plate_number: string
  from: string
}

const ScheduleItem: React.FC<props> = (props): JSX.Element => {
  const { id, user, departure_time, plate_number, destination, from } = props

  const { avatarUrl, displayName } = user

  return (
    <tr key={id}>
      <td
        className="
            text-dark border-b
            border-[#E8E8E8]
            bg-white
            py-5
            px-2
            text-center
            text-sm
            font-semibold md:text-base
          ">
        {destination}
      </td>
      <td
        className="
            text-dark flex
            flex-col
            items-center
            justify-center
            space-x-1
            border-b
            border-l
            border-[#E8E8E8] bg-[#F3F6FF] py-5
            px-2 text-center text-sm font-medium md:flex-row md:space-x-3 md:text-base
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
            text-dark border-b
            border-[#E8E8E8]
            bg-[#F3F6FF]
            py-5
            px-2
            text-center
            text-sm
            font-semibold md:text-base
          ">
        {Moment().format(`${departure_time} A`)}
      </td>
      <td
        className="
            text-dark border-b
            border-[#E8E8E8]
            bg-white
            py-5
            px-2
            text-center
            text-sm
            font-semibold md:text-base
          ">
        {plate_number}
      </td>
      <td
        className="
            border-b
            border-[#E8E8E8]
            bg-[#F3F6FF]
            py-5
            px-2
            text-center
            text-sm
            font-semibold md:text-base
          ">
        <Link href={`/map/${id}?from=${from}`}>
          <a className="flex  justify-center space-x-2 text-sm text-blue-500 hover:underline">
            <FaMapMarkedAlt className="h-5 w-5" />
            <span>View Live Map</span>
          </a>
        </Link>
      </td>
    </tr>
  )
}

export default ScheduleItem
