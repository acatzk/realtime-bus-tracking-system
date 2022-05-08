import DashboardLayout from 'layouts/DashboardLayout'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CREATE_BUS_TRACKER_MUTATION } from 'graphql/mutations'
import { nhost } from 'lib/nhost-client'
import { useUserData } from '@nhost/react'
import { CHECK_EMPLOYEE_IF_ALREADY_TRACK } from 'graphql/queries'
import Moment from 'moment'
import { useRouter } from 'next/router'
import { direction } from 'mock/object-list'
import { useForm } from 'react-hook-form'
import TrackMeForm from 'components/TrackMeForm'

const TrackMe: NextPage = () => {
  const user = useUserData()
  const router = useRouter()
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [selected, setSelected] = useState(direction[0])

  const { reset } = useForm()

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
        const result = await nhost.graphql.request(CREATE_BUS_TRACKER_MUTATION, {
          plate_number,
          longitude: longitude,
          latitude: latitude,
          destination: selected.name
        })

        // console.log(result)

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
    <DashboardLayout metaHead="| Track Me">
      <main className="min-h-[81vh] px-4 md:px-8 lg:px-16 pb-8 md:max-w-2xl lg:max-w-7xl mx-auto">
        <div className="mt-8 max-w-lg mx-auto">
          <h1 className="text-lg font-bold text-center">Track Bus Driver</h1>
          <TrackMeForm
            selected={selected}
            setSelected={setSelected}
            onSubmitForm={onSubmitForm}
            direction={direction}
            latitude={latitude}
            longitude={longitude}
          />
        </div>
      </main>
    </DashboardLayout>
  )
}

export default TrackMe
