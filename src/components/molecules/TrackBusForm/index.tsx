import useSWR from 'swr'
import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

import { nhost } from '~/lib/nhost-client'
import { classNames } from '~/helpers/classNames'
import { GET_ALL_BUSSES } from '~/graphql/queries'
import { IDestination } from '~/shared/interfaces'

type props = {
  selected: any
  setSelected: any
  onSubmitForm: any
  direction: any
  longitude: number
  latitude: number
  handleReloadPage: any
}

const TrackBusForm: React.FC<props> = (props): JSX.Element => {
  const { data, error } = useSWR(
    GET_ALL_BUSSES,
    async (query: string) => await nhost.graphql.request(query),
    {
      refreshInterval: 1000,
      revalidateOnMount: true
    }
  )

  const { selected, setSelected, onSubmitForm, direction, latitude, longitude, handleReloadPage } =
    props

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      departure_time: '',
      plate_number: ''
    }
  })

  return (
    <form className="mt-2" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="mb-6">
        <label htmlFor="Destination" className="mb-2 block text-sm font-medium text-gray-900">
          Destination
        </label>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button
              className={classNames(
                'relative w-full cursor-default rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                'focus:outline-none border-gray-300 bg-gray-50 py-2 pl-3 pr-10 text-left ring-indigo-200 focus:ring-indigo-500 sm:text-sm'
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
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
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
          Depature Time
        </label>
        <input
          type="time"
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
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between space-x-3">
          <label htmlFor="password" className="block text-sm font-medium text-gray-900">
            Your Location
          </label>
          <button
            type="button"
            onClick={handleReloadPage}
            className="rounded border p-1 text-xs hover:bg-gray-50 active:bg-gray-100">
            Reload
          </button>
        </div>
        <div className="flex w-full items-center space-x-4">
          <input
            type="hidden"
            placeholder="Longitude"
            value={`Longitude: ${longitude}`}
            disabled
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <input
            type="hidden"
            placeholder="Latitude"
            value={`Latitude: ${latitude}`}
            disabled
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div className="mt-2">
          <iframe
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
            width="100%"
            className="shadow-lg"
            height="280"
            style={{ border: '0' }}
            loading="lazy"></iframe>
        </div>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}

export default TrackBusForm
