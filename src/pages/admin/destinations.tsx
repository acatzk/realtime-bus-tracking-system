import useSWR from 'swr'
import { NextPage } from 'next'
import { toast } from 'react-toastify'
import { FiPlus } from 'react-icons/fi'
import React, { useState } from 'react'

import { nhost } from '~/lib/nhost-client'
import { classNames } from '~/helpers/classNames'
import { GET_ALL_BUSSES } from '~/graphql/queries'
import { DestinationFormValues } from '~/shared/types'
import AdminLayout from '~/components/templates/AdminLayout'
import DestinationList from '~/components/molecules/DestinationList'
import { CREATE_BUSS_ONE, DELETE_BUSS_BY_PK_ID } from '~/graphql/mutations'
import AddNewDestination from '~/components/molecules/DestinationList/AddNewDestinationDialog'

const Schedules: NextPage = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { data, mutate } = useSWR(GET_ALL_BUSSES, (query: string) => nhost.graphql.request(query), {
    refreshInterval: 1000,
    revalidateOnMount: true
  })

  const closeModal = (): void => setIsOpen(!isOpen)

  // This will handle save new destination
  const handleSave = async (data: DestinationFormValues): Promise<void> => {
    const { destination: name } = data
    try {
      const response = await nhost.graphql.request(CREATE_BUSS_ONE, { name })

      if (response.data) {
        toast.success('Added Destination Successfully!')
        mutate()
        closeModal()
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  // This will handle delete destination
  const handleDelete = async (id: number): Promise<void> => {
    try {
      const confirmation = confirm('Are you sure you want to delete?')
      if (confirmation) {
        await nhost.graphql.request(DELETE_BUSS_BY_PK_ID, { id })
        mutate()
        toast.success('Deleted Successfully!')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <AdminLayout metaTitle="Destination">
      <main className="mx-auto mt-6 px-4 md:max-w-2xl md:px-8 lg:max-w-7xl lg:px-16">
        <div className="w-full overflow-hidden rounded-lg border bg-white">
          <div className="flex items-center justify-between border-b border-gray-300 py-3 px-5">
            <h2 className="font-medium">List of Destination</h2>
            <button
              type="button"
              className={classNames(
                'inline-block rounded bg-green-500 px-2 py-1.5 text-xs font-medium leading-tight text-white',
                'focus:outline-none hover:bg-green-600 focus:bg-green-600 focus:ring-0 active:bg-green-700',
                'transition duration-150 ease-in-out',
                'flex items-center space-x-0.5'
              )}
              onClick={closeModal}>
              <FiPlus className="h-4 w-4" />
              <span>Destination</span>
            </button>
            <AddNewDestination
              {...{
                isOpen,
                closeModal,
                actions: {
                  handleSave
                }
              }}
            />
          </div>
          <div className="-px-2 -mt-2 flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="max-h-[50vh] overflow-y-auto scrollbar-w-2 scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                  <DestinationList
                    {...{
                      data: data?.data?.busses,
                      mutate,
                      actions: {
                        handleDelete
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AdminLayout>
  )
}

export default Schedules
