import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Footer from 'components/Footer'
import Header from 'components/Header'
import useSWR, { mutate } from 'swr'
import { GET_TRACK_IF_EXIST_AND_STATUS } from 'graphql/queries'
import { nhost } from 'lib/nhost-client'
import { useAuthenticationStatus, useUserData } from '@nhost/react'
import Moment from 'moment'
import { UPDATE_BUS_DRIVER_STATUS_BY_PK, UPDATE_TRACKER_BY_PK_ID } from 'graphql/mutations'
import { toast } from 'react-toastify'
import { GetServerSidePropsContext } from 'next'
import { getNhostSession } from '@nhost/nextjs'

export type props = {
  children: React.ReactNode
  metaHead?: string
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const nhostSession = await getNhostSession(`${process.env.NEXT_PUBLIC_NHOST_BACKEND}`, context)

  return {
    props: {
      nhostSession
    }
  }
}

const PageLayout: React.FC<props> = (props) => {
  const { children, metaHead } = props

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const user = useUserData()
  const { isAuthenticated } = useAuthenticationStatus()

  // Check the current Status and check if exist
  const { data: driverData } = useSWR(
    GET_TRACK_IF_EXIST_AND_STATUS,
    async (query) =>
      await nhost.graphql.request(query, {
        user_id: user?.id,
        date_created: Moment().format('YYYY-MM-DD')
      }),
    {
      refreshInterval: 1000,
      revalidateOnMount: true
    }
  )

  const isActiveDriverStatus = driverData?.data?.trackers[0]?.isActive
  const getCurrentTrackerId = driverData?.data?.trackers[0]?.id
  const getCurrentLatitude = driverData?.data?.trackers[0]?.latitude
  const getCurrentLongitude = driverData?.data?.trackers[0]?.longitude

  useEffect(() => {
    isAuthenticated && isActiveDriverStatus
      ? updateBusTrackerLocation()
      : console.log('Stopped Updating location...')
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  })

  const updateBusTrackerLocation = async () => {
    if (latitude !== getCurrentLatitude && longitude !== getCurrentLongitude) {
      if (getCurrentLatitude !== 0 && getCurrentLongitude !== 0) {
        const {
          data: { update_trackers_by_pk }
        } = await nhost.graphql.request(UPDATE_TRACKER_BY_PK_ID, {
          id: getCurrentTrackerId,
          latitude: latitude,
          longitude: longitude
        })
        await mutate({
          ...update_trackers_by_pk
        })
        console.log(update_trackers_by_pk)
      } else {
        console.log('Current location is 0')
      }
    }
  }

  const onSubmitForm = async () => {
    const { data: driverData } = await nhost.graphql.request(GET_TRACK_IF_EXIST_AND_STATUS, {
      user_id: user?.id,
      date_created: Moment().format('YYYY-MM-DD')
    })

    let isDriverActive = driverData?.trackers[0]?.isActive
    let currentTrackPkId = driverData?.trackers[0]?.id

    const result = await nhost.graphql.request(UPDATE_BUS_DRIVER_STATUS_BY_PK, {
      id: currentTrackPkId,
      isActive: !isDriverActive
    })

    if (!isDriverActive && result) {
      toast.success(`Status: ACTIVE`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } else {
      toast(`Status: INACTIVE`, {
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

  return (
    <React.Fragment>
      <Head>
        <title>Clementina {metaHead}</title>
      </Head>
      <Header driverData={driverData} onSubmitForm={onSubmitForm} />
      <div className="antialiased">{children}</div>
      <Footer />
    </React.Fragment>
  )
}

export default PageLayout
