import Moment from 'moment'
import Head from 'next/head'
import useSWR, { mutate } from 'swr'
import { toast } from 'react-toastify'
import React, { useEffect } from 'react'
import { GetServerSidePropsContext } from 'next'
import { getNhostSession } from '@nhost/nextjs'
import { useAuthenticationStatus, useUserData } from '@nhost/react'

import { nhost } from '~/lib/nhost-client'
import Footer from '~/components/organisms/Footer'
import Header from '~/components/organisms/Header'
import { GET_TRACK_IF_EXIST_AND_STATUS } from '~/graphql/queries'
import { UPDATE_BUS_DRIVER_STATUS_BY_PK, UPDATE_TRACKER_BY_PK_ID } from '~/graphql/mutations'

type props = {
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

const PageLayout: React.FC<props> = (props): JSX.Element => {
  const { children, metaHead } = props

  const user = useUserData()
  const { isAuthenticated } = useAuthenticationStatus()

  // Check the current Status and check if exist
  const address = GET_TRACK_IF_EXIST_AND_STATUS
  const fetcher = async (query: string) =>
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
          console.log(`Info: Update Location`)
        }
      } else {
        console.log('Zero geolocation')
      }
    })
  }

  const handleStatus = async () => {
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

    mutate({
      ...driverData,
      ...driverData?.trackers
    })

    if (!isDriverActive && result) {
      toast.success(`Status: ACTIVE`)
    } else {
      toast.success(`Status: INACTIVE`)
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Clemrose {metaHead}</title>
      </Head>
      <Header driverData={driverData} actions={{ handleStatus }} />
      <div className="antialiased">{children}</div>
      <Footer />
    </React.Fragment>
  )
}

export default PageLayout
