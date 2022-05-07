import React, { Fragment, useState } from 'react'
import { classNames } from 'utils'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { direction } from 'mock/object-list'

type props = {
  isOpen: boolean
  closeModal: any
  track: any
  onSubmitForm: any
  selected: any
  setSelected: any
}

const UpdateTrackerDialog: React.FC<props> = (props) => {
  const { isOpen, closeModal, track, onSubmitForm, selected, setSelected } = props

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm()

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 py-2 text-center">
                  Update Track Record
                </Dialog.Title>
                <form className="mt-2" onSubmit={handleSubmit(onSubmitForm)}>
                  <div className="mb-6">
                    <label
                      htmlFor="Destination"
                      className="text-sm font-medium text-gray-900 block mb-2">
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
                      Plate Number
                    </label>
                    <input
                      type="text"
                      defaultValue={track?.plate_number}
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
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default UpdateTrackerDialog
