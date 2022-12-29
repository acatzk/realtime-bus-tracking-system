import useSWR from 'swr'
import React from 'react'
import { useRouter } from 'next/router'
import { MapIcon } from '@heroicons/react/solid'

import THead from './THead'
import { nhost } from '~/lib/nhost-client'
import { ITrack } from '~/shared/interfaces'
import { classNames } from '~/helpers/classNames'
import handleImageError from '~/helpers/handleImageError'
import { GET_ALL_TRACKERS_BY_ADMIN } from '~/graphql/queries'

type Props = {}

const AdminDashboardList: React.FC<Props> = (props): JSX.Element => {
  const router = useRouter()

  const address = GET_ALL_TRACKERS_BY_ADMIN
  const fetcher = async (query: string) => await nhost.graphql.request(query)
  const options = {
    refreshInterval: 1000,
    revalidateOnMount: true
  }

  const { data: driverData } = useSWR(address, fetcher, options)

  return (
    <table className="min-w-full border-b ">
      <THead />
      <tbody>
        {driverData?.data?.trackers.map((track: ITrack) => {
          const {
            passengers_aggregate: {
              aggregate: { count: total_number_of_passengers }
            }
          } = track

          let sum = 0
          for (const value of track.passengers) {
            sum += value.amount
          }

          return (
            <tr
              key={track.id}
              className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-50">
              <td className="flex items-center space-x-2 whitespace-nowrap border-r px-6 py-4 text-sm font-medium text-gray-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={track?.user?.avatarUrl}
                  className="h-8 w-8 rounded-full border"
                  onError={(e) =>
                    handleImageError(
                      e,
                      'https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7'
                    )
                  }
                  alt=""
                />
                <span>{track?.user?.displayName}</span>
              </td>
              <td className="whitespace-nowrap border-r px-6 py-4 text-sm font-medium text-gray-900">
                {track?.date_created}
              </td>
              <td className="whitespace-nowrap border-r px-6 py-4 text-sm font-medium text-gray-900">
                {track?.destination}
              </td>
              <td className="whitespace-nowrap border-r px-6 text-sm font-medium text-gray-900">
                {track?.departure_time}
              </td>
              <td className="whitespace-nowrap border-r px-6 text-sm font-medium text-gray-900">
                {track?.plate_number}
              </td>
              <td className="whitespace-nowrap border-r px-6 text-sm font-medium text-gray-900">
                {total_number_of_passengers}
              </td>
              <td className="whitespace-nowrap border-r px-6 text-sm font-medium text-gray-900">
                ₱{sum}
              </td>
              <td className="mt-text-sm whitespace-nowrap border-r px-6 font-medium text-gray-900">
                <div className="flex items-center justify-start">
                  <div className="inline-flex" role="group">
                    <button
                      type="button"
                      onClick={() => router.push(`/map/${track?.id}?from=admin`)}
                      className={classNames(
                        'inline-block rounded-full px-2 py-0.5 text-xs font-semibold leading-tight text-blue-600 hover:underline',
                        'flex items-center transition duration-150 ease-in-out'
                      )}>
                      <MapIcon className="mr-2 h-5 w-5" /> View Live Map
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default AdminDashboardList
