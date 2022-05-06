import DashboardLayout from 'layouts/DashboardLayout'
import { NextPage } from 'next'
import React, { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { classNames } from 'utils/classNames'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { CREATE_BUS_TRACKER_MUTATION } from 'graphql/mutations'
import { nhost } from 'lib/nhost-client'
import { useUserData } from '@nhost/react'
import { CHECK_EMPLOYEE_IF_ALREADY_TRACK } from 'graphql/queries'
import Moment from 'moment'
import { useRouter } from 'next/router'

const direction = [
  { name: 'Sogod -> Ormoc City' },
  { name: 'Ormoc City -> Sogod' },
  { name: 'Sogod -> Tacloban' }
]

const TrackMe: NextPage = () => {
  const user = useUserData()
  const router = useRouter()
  const [selected, setSelected] = useState(direction[0])
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      plate_number: ''
    }
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  })

  const onSubmitForm = async (data) => {
    const { plate_number } = data

    if (latitude === 0 || longitude === 0) {
      toast.error(`Your location is invalid, open GPS and Location Info`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } else {
      // Check employee if already been tracked!
      const {
        data: {
          trackers_aggregate: {
            aggregate: { count }
          }
        }
      } = await nhost.graphql.request(CHECK_EMPLOYEE_IF_ALREADY_TRACK, {
        user_id: user?.id,
        created_at: Moment().format('YYYY-MM-DD')
      })

      if (count === 0) {
        // Insert the actual insert of the trackers table
        const {
          data: { insert_trackers }
        } = await nhost.graphql.request(CREATE_BUS_TRACKER_MUTATION, {
          user_id: user?.id,
          plate_number,
          longitude: longitude,
          latitude: latitude,
          destination: selected.name
        })

        const { affected_rows } = insert_trackers

        if (affected_rows === 1) {
          reset()
          toast.success(`Success, keep safe while driving!`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
          router.push('/dashboard')
        }
      } else {
        toast.warning(`You already saved data for today.`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      }
    }
  }

  return (
    <DashboardLayout metaHead="| Dashboard">
      <main className="min-h-[81vh] px-4 md:px-8 lg:px-16 pb-8 md:max-w-2xl lg:max-w-7xl mx-auto">
        <div className="mt-8 max-w-lg mx-auto">
          <h1 className="text-lg font-bold text-center">Track Bus Driver</h1>
          <form className="mt-2" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="mb-6">
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
                      {direction.map((location, index) => (
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
            <div className="mb-6">
              <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">
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
              <div className="mt-2">
                <iframe
                  src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                  width="100%"
                  className="shadow-lg"
                  height="280"></iframe>
                {/* https://maps.google.com/maps?q=10.3435804,124.8675566&z=15 
                  https://www.google.com/maps/embed?pb=!1m39!1m12!1m3!1d236980.84138606823!2d124.74864759244088!3d10.500108770558938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m24!3e0!4m5!1s0x330711db96aa79ff%3A0xc658142f36148f6c!2sSogod%2C%20Southern%20Leyte!3m2!1d10.4329228!2d124.994751!4m5!1s0x33076bea6b4811f1%3A0x343065e793f56d53!2sBato%2C%20Leyte!3m2!1d10.339768699999999!2d124.84953039999999!4m5!1s0x3307f08752b5cbf1%3A0x7f3f844d6109f37b!2sOrmoc%20City%2C%20Leyte!3m2!1d11.0384275!2d124.61927019999999!4m4!2s10.3435804%2C124.8675566!3m2!1d${latitude}!2d${longitude}!5e0!3m2!1sen!2sph!4v1651720299960!5m2!1sen!2sph&z=15&output=embed
                */}
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </main>
    </DashboardLayout>
  )
}

export default TrackMe
