import useSWR from 'swr'
import Moment from 'moment'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import React, { FC, Fragment, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

import { nhost } from '~/lib/nhost-client'
import { direction } from '~/mock/object-list'
import { classNames } from '~/helpers/classNames'
import { GET_ALL_BUSSES } from '~/graphql/queries'
import { PassengerFormValues } from '~/shared/types'
import { PasengersFormSchema } from '~/shared/validation'
import { CREATE_PASSENGER_ONE } from '~/graphql/mutations'

type Props = {
  isActiveDriverStatus: boolean
  track_id: string
}

const PassengersForm: FC<Props> = ({ isActiveDriverStatus, track_id }): JSX.Element => {
  const { data } = useSWR(
    GET_ALL_BUSSES,
    async (query: string) => await nhost.graphql.request(query),
    {
      refreshInterval: 1000,
      revalidateOnMount: true
    }
  )

  const [selected, setSelected] = useState(data?.data?.busses[0])

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<PassengerFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(PasengersFormSchema)
  })

  const handleSavePassengers = async (data: PassengerFormValues): Promise<void> => {
    try {
      const { name, amount, date_created } = data
      const response = await nhost.graphql.request(CREATE_PASSENGER_ONE, {
        track_id,
        name,
        date_created,
        destination: selected.name,
        amount
      })

      if (response.data) {
        toast.success('Added New Passenger Successfully!')
        reset({
          name: '',
          amount: 0
        })
      } else {
        toast.error('Something went wrong!')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <form className="mt-2" onSubmit={handleSubmit(handleSavePassengers)}>
      <input
        hidden
        type="date"
        {...register('date_created')}
        defaultValue={Moment().format('YYYY-MM-DD')}
        placeholder="Enter bus plate number"
      />
      <div className="mb-6">
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
          Name <small>(Optional)</small>
        </label>
        <input
          type="text"
          className={classNames(
            'sm:text-md mt-1 block w-full rounded-md py-2 shadow-sm',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'border-gray-300 transition duration-150 ease-in-out',
            'ring-indigo-200 focus:ring-indigo-500'
          )}
          {...register('name')}
          disabled={!isActiveDriverStatus || isSubmitting}
          placeholder="Enter Passenger Name"
        />
        {errors?.name && (
          <span className="ml-1 text-xs text-red-500">{`${errors.name.message}`}</span>
        )}
      </div>
      <div className="mb-6">
        <label htmlFor="Destination" className="mb-2 block text-sm font-medium text-gray-900">
          Destination
        </label>
        <Listbox
          value={selected}
          onChange={setSelected}
          disabled={!isActiveDriverStatus || isSubmitting}>
          <div className="relative mt-1">
            <Listbox.Button
              className={classNames(
                'relative w-full cursor-default rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                'focus:outline-none border-gray-300 bg-gray-50 py-2 pl-3 pr-10 text-left ring-indigo-200 focus:ring-indigo-500 sm:text-sm',
                'disabled:cursor-not-allowed disabled:opacity-50'
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
                {direction?.map((location: any, index: number) => (
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
        <label htmlFor="amount" className="mb-2 block text-sm font-medium text-gray-900">
          Amount
        </label>
        <input
          type="number"
          className={classNames(
            'sm:text-md mt-1 block w-full rounded-md py-2 shadow-sm',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition duration-150 ease-in-out',
            errors.amount?.message
              ? 'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 ring-indigo-200 focus:ring-indigo-500'
          )}
          {...register('amount', { required: true })}
          disabled={!isActiveDriverStatus || isSubmitting}
          placeholder="Enter Fare Amount"
        />
        {errors?.amount && (
          <span className="ml-1 text-xs text-red-500">{`${errors.amount.message}`}</span>
        )}
      </div>
      <button
        type="submit"
        className={classNames(
          'rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
        disabled={!isActiveDriverStatus || isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}

export default PassengersForm
