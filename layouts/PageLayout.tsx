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

  const user = useUserData()
  const { isAuthenticated } = useAuthenticationStatus()

  // Check the current Status and check if exist
  const address = GET_TRACK_IF_EXIST_AND_STATUS
  const fetcher = async (query) =>
    await nhost.graphql.request(query, {
      user_id: user?.id,
      date_created: Moment().format('YYYY-MM-DD')
    })
  const options = {
    refreshInterval: 1000,
    revalidateOnMount: true
  }
  const { data: driverData } = useSWR(address, fetcher, options)

  const isActiveDriverStatus = driverData?.data?.trackers[0]?.isActive
  const getCurrentTrackerId = driverData?.data?.trackers[0]?.id
  let getCurrentLatitude = driverData?.data?.trackers[0]?.latitude
  let getCurrentLongitude = driverData?.data?.trackers[0]?.longitude

  useEffect(() => {
    try {
      isAuthenticated && isActiveDriverStatus
        ? updateBusTrackerLocation()
        : console.log('Stopped Updating location...')
    } catch (error: any) {
      console.log(error)
    }
  })

  const updateBusTrackerLocation = async () => {
    await navigator.geolocation.getCurrentPosition(async (position) => {
      let latitude = position.coords.latitude
      let longitude = position.coords.longitude

      if (latitude !== 0 && longitude !== 0) {
        if (latitude !== getCurrentLatitude && longitude !== getCurrentLongitude) {
          const {
            data: { update_trackers_by_pk }
          } = await nhost.graphql.request(UPDATE_TRACKER_BY_PK_ID, {
            id: getCurrentTrackerId,
            latitude: latitude,
            longitude: longitude
          })
          await mutate({
            ...driverData,
            ...update_trackers_by_pk
          })
          console.log(latitude)
          console.log(longitude)
          console.log(update_trackers_by_pk)
        }
      } else {
        console.log('Zero geolocation')
      }
    })
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
