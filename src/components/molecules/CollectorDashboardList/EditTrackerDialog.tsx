import useSWR from 'swr'
import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

import { nhost } from '~/lib/nhost-client'
import { classNames } from '~/helpers/classNames'
import { GET_ALL_BUSSES } from '~/graphql/queries'
import { IDestination } from '~/shared/interfaces'
import DialogBox from '~/components/templates/DialogBox'

type props = {
  isOpen: boolean
  closeModal: () => void
  track: any
  actions: any
  selected: any
  setSelected: any
}

const EditTrackerDialog: React.FC<props> = (props): JSX.Element => {
  const { data } = useSWR(
    GET_ALL_BUSSES,
    async (query: string) => await nhost.graphql.request(query),
    {
      refreshInterval: 1000,
      revalidateOnMount: true
    }
  )

  const { isOpen, closeModal, track, selected, setSelected, actions } = props
  const { handleUpdate } = actions

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: '',
      departure_time: '',
      plate_number: ''
    }
  })

  return (
    <DialogBox isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Title
        as="h3"
        className="py-2 text-center text-lg font-medium leading-6 text-gray-900">
        Update Track Record
      </Dialog.Title>
      <form className="mt-2" onSubmit={handleSubmit(handleUpdate)}>
        <div className="mb-6">
          <div className="mb-6">
            <input
              type="hidden"
              className="w-full"
              defaultValue={track?.id}
              defaultChecked={track?.id}
              {...register('id', { required: true })}
            />
          </div>
          <label htmlFor="Destination" className="mb-2 block text-sm font-medium text-gray-900">
            Destination
          </label>
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button
                className={classNames(
                  'relative w-full cursor-default rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                  'focus:outline-none bg-gray-50 py-2 pl-3 pr-10 text-left sm:text-sm'
                )}>
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options
                  className={classNames(
                    'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1',
                    'focus:outline-none ring-black ring-opacity-5 sm:text-sm'
                  )}>
                  {data?.data?.busses?.map((location: IDestination, index: number) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                        }`
                      }
                      value={location}>
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}>
                            {location.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
            Departure Time
          </label>
          <input
            type="time"
            defaultValue={track?.departure_time}
            defaultChecked={track?.departure_time}
            className={classNames(
              'sm:text-md mt-1 block w-full rounded-md py-2 shadow-sm',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition duration-150 ease-in-out',
              errors.departure_time?.type === 'required'
                ? 'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 ring-indigo-200 focus:ring-indigo-500'
            )}
            {...register('departure_time', { required: true })}
          />
          {errors.departure_time?.type === 'required' && (
            <span className="ml-1 text-xs text-red-500">Departure Time is required</span>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
            Plate Number
          </label>
          <input
            type="text"
            defaultValue={track?.plate_number}
            defaultChecked={track?.plate_number}
            className={classNames(
              'sm:text-md mt-1 block w-full rounded-md py-2 shadow-sm',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition duration-150 ease-in-out',
              errors.plate_number?.type === 'required'
                ? 'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 ring-indigo-200 focus:ring-indigo-500'
            )}
            {...register('plate_number', { required: true })}
            placeholder="Enter bus plate number"
          />
          {errors.plate_number?.type === 'required' && (
            <span className="ml-1 text-xs text-red-500">Plate number is required</span>
          )}
        </div>
        <div className="flex justify-end space-x-1">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg bg-gray-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-gray-600 focus:ring-4 focus:ring-gray-300">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </DialogBox>
  )
}

export default EditTrackerDialog
