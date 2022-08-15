import React from 'react'
import { classNames } from 'utils'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { FaMapMarkedAlt } from 'react-icons/fa'
import Link from 'next/link'
import Moment from 'moment'

type props = {
  id: string
  user: any
  departure_time: string
  destination: string
  plate_number: string
}

const ScheduleAccordionItem: React.FC<props> = ({
  id,
  user,
  departure_time,
  plate_number,
  destination
}) => {
  const { avatarUrl, displayName, lastSeen } = user

  return (
    <Disclosure key={id}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              'relative flex items-center',
              'w-full py-3 px-5 text-base text-gray-800 text-left',
              'bg-white border-0 rounded-none transition focus:outline-none',
              'flex justify-between hover:bg-gray-50',
              'transition ease-in-out duration-150'
            )}>
            <div>
              <div className="flex flex-row items-center space-x-2">
                <div className="relative">
                  <Image
                    src={avatarUrl === null ? 'https://i.stack.imgur.com/l60Hf.png' : avatarUrl}
                    width={38}
                    height={38}
                    className="rounded-full"
                    alt="Avatar"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-md font-medium">{displayName}</h4>
                  <span className="text-xs font-normal">
                    Active &bull; {Moment(lastSeen).fromNow()}
                  </span>
                </div>
              </div>
            </div>
            <ChevronUpIcon
              className={`${!open ? 'rotate-180 transform' : ''} h-5 w-5 text-blue-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="bg-white w-full text-gray-600">
            <ul className="divide-y">
              <li className="px-3 py-2 w-full flex flex-wrap">
                <span>Destination:</span>
                <span className="ml-2  text-blue-500 flex-shrink-0 px-1 text-md rounded-full font-medium border border-blue-500">
                  {destination}
                </span>
              </li>
              <li className="px-3 py-2 w-full space-x-2">
                <span>Departure Time:</span>
                <span className="text-blue-500 px-1 text-md rounded-full font-medium border border-blue-500">
                  {departure_time}
                </span>
              </li>
              <li className="px-3 py-2 w-full space-x-2">
                <span>Plate Number:</span>
                <span className="text-blue-500 px-1 text-md rounded-full font-medium border border-blue-500">
                  {plate_number}
                </span>
              </li>
              <li className="px-3 py-2 w-full space-x-2 flex items-center">
                <span>Track Location:</span>
                <Link href={`/map/${id}`}>
                  <a className="flex justify-center space-x-2 hover:underline text-blue-500">
                    <span className="text-md font-medium">View Live Map</span>
                    <FaMapMarkedAlt className="w-5 h-5" />
                  </a>
                </Link>
              </li>
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default ScheduleAccordionItem
