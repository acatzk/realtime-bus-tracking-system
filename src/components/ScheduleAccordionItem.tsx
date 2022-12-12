import React from 'react'
import Moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { ChevronUpIcon } from '@heroicons/react/solid'

import { classNames } from '~/helpers/classNames'

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
}): JSX.Element => {
  const { avatarUrl, displayName, lastSeen } = user

  return (
    <Disclosure key={id}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              'relative flex items-center',
              'w-full py-3 px-5 text-left text-base text-gray-800',
              'focus:outline-none rounded-none border-0 bg-white transition',
              'flex justify-between hover:bg-gray-50',
              'transition duration-150 ease-in-out'
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
          <Disclosure.Panel className="w-full bg-white text-gray-600">
            <ul className="divide-y">
              <li className="flex w-full flex-wrap px-3 py-2">
                <span>Destination:</span>
                <span className="text-md  ml-2 flex-shrink-0 rounded-full border border-blue-500 px-1 font-medium text-blue-500">
                  {destination}
                </span>
              </li>
              <li className="w-full space-x-2 px-3 py-2">
                <span>Departure Time:</span>
                <span className="text-md rounded-full border border-blue-500 px-1 font-medium text-blue-500">
                  {departure_time}
                </span>
              </li>
              <li className="w-full space-x-2 px-3 py-2">
                <span>Plate Number:</span>
                <span className="text-md rounded-full border border-blue-500 px-1 font-medium text-blue-500">
                  {plate_number}
                </span>
              </li>
              <li className="flex w-full items-center space-x-2 px-3 py-2">
                <span>Track Location:</span>
                <Link href={`/map/${id}`}>
                  <a className="flex justify-center space-x-2 text-blue-500 hover:underline">
                    <span className="text-md font-medium">View Live Map</span>
                    <FaMapMarkedAlt className="h-5 w-5" />
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
