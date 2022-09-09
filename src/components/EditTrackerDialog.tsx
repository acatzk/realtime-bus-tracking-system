import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

import DialogBox from './DialogBox'
import { direction } from '~/mock/object-list'
import { classNames } from '~/helpers/classNames'

type props = {
  isOpen: boolean
  closeModal: any
  track: any
  actions: any
  selected: any
  setSelected: any
}

const EditTrackerDialog: React.FC<props> = (props): JSX.Element => {
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
        className="text-lg font-medium leading-6 text-gray-900 py-2 text-center">
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
          <label htmlFor="Destination" className="text-sm font-medium text-gray-900 block mb-2">
            Destination
          </label>
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button
                className={classNames(
                  'relative border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-full cursor-default rounded-lg',
                  'bg-gray-50 py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm'
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
                    'ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                  )}>
                  {direction?.map((location, index) => (
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
          <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">
            Departure Time
          </label>
          <input
            type="time"
            defaultValue={track?.departure_time}
            defaultChecked={track?.departure_time}
            className={classNames(
              'mt-1 block py-2 w-full shadow-sm sm:text-md rounded-md',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition ease-in-out duration-150',
              errors.departure_time?.type === 'required'
                ? 'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500'
                : 'ring-indigo-200 focus:ring-indigo-500 border-gray-300'
            )}
            {...register('departure_time', { required: true })}
          />
          {errors.departure_time?.type === 'required' && (
            <span className="text-xs text-red-500 ml-1">Departure Time is required</span>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">
            Plate Number
          </label>
          <input
            type="text"
            defaultValue={track?.plate_number}
            defaultChecked={track?.plate_number}
            className={classNames(
              'mt-1 block py-2 w-full shadow-sm sm:text-md rounded-md',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition ease-in-out duration-150',
              errors.plate_number?.type === 'required'
                ? 'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500'
                : 'ring-indigo-200 focus:ring-indigo-500 border-gray-300'
            )}
            {...register('plate_number', { required: true })}
            placeholder="Enter bus plate number"
          />
          {errors.plate_number?.type === 'required' && (
            <span className="text-xs text-red-500 ml-1">Plate number is required</span>
          )}
        </div>
        <div className="flex justify-end space-x-1">
          <button
            type="button"
            onClick={closeModal}
            className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 text-center">
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center">
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </DialogBox>
  )
}

export default EditTrackerDialog
