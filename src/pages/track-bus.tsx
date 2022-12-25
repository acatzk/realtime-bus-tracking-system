import Moment from 'moment'
import { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { useAuthenticationStatus, useUserData } from '@nhost/react'

import { nhost } from '~/lib/nhost-client'
import { direction } from '~/mock/object-list'
import TrackBusForm from '~/components/molecules/TrackBusForm'
import { CREATE_BUS_TRACKER_MUTATION } from '~/graphql/mutations'
import { CHECK_EMPLOYEE_IF_ALREADY_TRACK } from '~/graphql/queries'
import DashboardLayout from '~/components/templates/DashboardLayout'

const TrackBus: NextPage = (): JSX.Element => {
  const user = useUserData()
  const router = useRouter()
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [selected, setSelected] = useState(direction[0])
  const { isAuthenticated } = useAuthenticationStatus()

  const { reset } = useForm()

  useEffect(() => {
    isAuthenticated &&
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      })
  })

  const onSubmitForm = async (data: any) => {
    const { departure_time, plate_number } = data

    if (latitude === 0 || longitude === 0) {
      toast.error(`Your location is invalid, open GPS and Location Info`)
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
        date_created: Moment().format('YYYY-MM-DD')
      })

      if (count === 0) {
        // Insert the actual insert of the trackers table
        await nhost.graphql.request(CREATE_BUS_TRACKER_MUTATION, {
          plate_number,
          longitude: longitude,
          latitude: latitude,
          destination: selected.name,
          departure_time: departure_time,
          date_created: Moment().format('YYYY-MM-DD')
        })

        reset()
        toast.success(`Success, keep safe while driving!`)
        router.push('/dashboard')
      } else {
        toast.warning(`You already saved data for today.`)
      }
    }
  }

  const onRealodPage = () => {
    return location.reload()
  }

  return (
    <DashboardLayout metaHead="| Track Me">
      <main className="mx-auto min-h-[81vh] px-4 pb-8 md:max-w-2xl md:px-8 lg:max-w-7xl lg:px-16">
        <div className="mx-auto mt-8 max-w-lg">
          <h1 className="text-center text-lg font-bold">Track Bus Driver</h1>
          <TrackBusForm
            selected={selected}
            setSelected={setSelected}
            onSubmitForm={onSubmitForm}
            direction={direction}
            latitude={latitude}
            longitude={longitude}
            handleReloadPage={onRealodPage}
          />
        </div>
      </main>
    </DashboardLayout>
  )
}

export default TrackBus
