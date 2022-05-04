import DashboardLayout from 'layouts/DashboardLayout'
import { NextPage } from 'next'
import React, { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { classNames } from 'utils/classNames'

const people = [
  { name: 'Sogod -> Ormoc City' },
  { name: 'Ormoc City -> Sogod' },
]

const TrackMe: NextPage = () => {
  const [selected, setSelected] = useState(people[0])
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  })

  return (
    <DashboardLayout metaHead="| Dashboard">
      <main className="min-h-[81vh] px-4 md:px-8 lg:px-16 pb-8 md:max-w-2xl lg:max-w-7xl mx-auto">
        <div className="mt-8 max-w-lg mx-auto">
          <h1 className="text-lg font-bold text-center">Track Bus Driver</h1>
          <form className="mt-2">
            <div className="mb-6">
              <label
                htmlFor="Destination"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Destination
              </label>
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                  <Listbox.Button
                    className={classNames(
                      'relative border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-full cursor-default rounded-lg',
                      'bg-gray-50 py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm'
                    )}
                  >
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className={classNames(
                        'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1',
                        'ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                      )}
                    >
                      {people.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-blue-100 text-blue-900'
                                : 'text-gray-900'
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {person.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
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
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Plate Number
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Input bus place number"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Your Location
              </label>
              <div className="w-full flex items-center space-x-4">
                <input
                  type="hidden"
                  placeholder="Longitude"
                  value={`Longitude: ${longitude}`}
                  disabled
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                <input
                  type="hidden"
                  placeholder="Latitude"
                  value={`Latitude: ${latitude}`}
                  disabled
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <iframe
                  src={`https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`}
                  width="100%"
                  height="280"
                ></iframe>
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save
            </button>
          </form>
        </div>
      </main>
    </DashboardLayout>
  )
}

export default TrackMe
