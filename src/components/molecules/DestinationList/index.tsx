import { KeyedMutator } from 'swr'
import { toast } from 'react-toastify'
import React, { FC, useState } from 'react'

import THead from './THead'
import { nhost } from '~/lib/nhost-client'
import { classNames } from '~/helpers/classNames'
import { IDestination } from '~/shared/interfaces'
import { DestinationFormValues } from '~/shared/types'
import EditDestinationDialog from './EditDestinationDialog'
import { UPDATE_BUSS_BY_PK_ID } from '~/graphql/mutations'

type Props = {
  data: IDestination[]
  mutate: KeyedMutator<any>
  actions: {
    handleDelete: (id: number) => Promise<void>
  }
}

const DestinationList: FC<Props> = ({ data, actions: { handleDelete }, mutate }): JSX.Element => {
  const [dest, setDest] = useState<IDestination>()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const closeModal = (dest: IDestination) => {
    setDest(dest)
    setIsOpen(!isOpen)
  }

  // This will handle Update function
  const handleUpdate = async (data: DestinationFormValues): Promise<void> => {
    try {
      await nhost.graphql.request(UPDATE_BUSS_BY_PK_ID, {
        id: data?.id,
        name: data?.destination
      })
      mutate()
      setIsOpen(!isOpen)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <table className="min-w-full">
      <THead />
      <tbody className="divide-y">
        {!data?.length ? (
          <tr>
            <td className="w-full py-2 text-center text-sm text-gray-600">No data available</td>
            <td></td>
          </tr>
        ) : (
          <>
            {data?.map((des: IDestination, i: number) => (
              <tr key={i} className="bg-white transition duration-300 ease-in-out hover:bg-gray-50">
                <td className="w-full whitespace-nowrap px-6 text-sm font-medium text-gray-900">
                  {des.name}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                  <div className="flex items-center justify-start">
                    <div className="inline-flex" role="group">
                      <button
                        type="button"
                        className={classNames(
                          'inline-block rounded-l bg-yellow-500 px-3 py-1.5 text-xs font-medium leading-tight text-white',
                          'focus:outline-none hover:bg-yellow-600 focus:bg-yellow-600 focus:ring-0 active:bg-yellow-700',
                          'transition duration-150 ease-in-out'
                        )}
                        onClick={() => closeModal(des)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className={classNames(
                          'inline-block rounded-r bg-red-500 px-2 py-0.5 text-xs font-medium leading-tight text-white',
                          'focus:outline-none hover:bg-red-600 focus:bg-red-600 focus:ring-0 active:bg-red-700',
                          'transition duration-150 ease-in-out'
                        )}
                        onClick={() => handleDelete(des.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {isOpen && (
              <EditDestinationDialog
                {...{
                  dest,
                  isOpen,
                  setIsOpen,
                  closeModal,
                  actions: {
                    handleUpdate
                  }
                }}
              />
            )}
          </>
        )}
      </tbody>
    </table>
  )
}

export default DestinationList
