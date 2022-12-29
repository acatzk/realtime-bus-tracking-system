import useSWR from 'swr'
import Link from 'next/link'
import Head from 'next/head'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'

import { Spinner } from '~/utils'
import { nhost } from '~/lib/nhost-client'
import { classNames } from '~/helpers/classNames'
import { GET_TRACKER_BY_ID } from '~/graphql/queries'

const Map: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { id, isFallback, from } = router.query
  const [latitude, setLatitude] = useState(0) // 10.251599
  const [longitude, setLongitude] = useState(0) // 124.985562

  const { data, error } = useSWR(
    GET_TRACKER_BY_ID,
    async (query) =>
      await nhost.graphql.request(query, {
        id: {
          _eq: id?.toString()
        }
      }),
    {
      refreshInterval: 1000,
      revalidateOnMount: true
    }
  )

  useEffect(() => {
    data?.data?.trackers?.map(
      ({ longitude, latitude }: { longitude: number; latitude: number }) => {
        setLatitude(latitude)
        setLongitude(longitude)
      }
    )
  })

  if (error)
    return (
      <p className="rounded bg-yellow-300 py-2 px-4 text-center text-sm font-medium">
        Loading failed...
      </p>
    )

  if (isFallback)
    return (
      <div className="flex min-h-screen items-center justify-center py-10">
        <Spinner className="h-8 w-8 md:h-10 md:w-10" />
      </div>
    )

  if (!isFallback && !data)
    return (
      <h1 className="rounded bg-yellow-300 py-2 px-4 text-center text-sm font-medium">
        No such map found!
      </h1>
    )

  return (
    <React.Fragment>
      <Head>
        <title>View Live Map</title>
      </Head>
      <main className="relative h-screen w-full bg-gray-100">
        <div className="left absolute right-0 top-0 z-10 m-5 animate-bounce">
          <Link
            href={
              from === 'admin' ? '/admin/dashboard' : '/dashboard' || (from === 'public' && '/')
            }>
            <a
              className={classNames(
                'animeted rounded-lg border bg-gray-50 px-2 py-2 font-medium hover:bg-gray-100',
                'flex items-center space-x-1 shadow-xl transition duration-150 ease-in-out active:bg-gray-200'
              )}>
              <IoMdArrowRoundBack className="h-5 w-5" />
              <span>Back</span>
            </a>
          </Link>
        </div>
        <iframe
          src={classNames(
            'https://www.google.com/maps/embed?pb=!1m63!1m12!1m3!1d211336.5274202848!2d124.9564999608942!3d10.18712418942519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m48!3e0!4m5!1s0x3306d64c5cbfa0c9%3A0x9e2dfff5921bd759!2s',
            'Kinachawa%2C%20Southern%20Leyte!3m2!1d10.0188847!2d125.2450647!4m5!1s0x3306d67df873560f%3A0xbc4397c55f417f36!2s',
            'San%20Ricardo%2C%20Southern%20Leyte!3m2!1d9.9769939!2d125.2738186!4m5!1s0x3306d5debfcc7733%3A0x61c9d9a09d6edbd7!2s',
            'Pintuyan%2C%20Southern%20Leyte!3m2!1d9.99513!2d125.2258365!4m5!1s0x330711c59ca30769%3A0x2a3fd238fb08613c!2sDr.%20Gonzalo%20Yong%20Memorial%20Bus%20Terminal%2C%20Osme%C3%B1a%20Street%2C%20Sogod%2C%206606%2',
            'Southern%20Leyte!3m2!1d10.384186!2d124.9829407!4m5!1s0x33073b7eb054d58f%3A0x41f4184f8f60812e!2s',
            'Malitbog%20Main%20Road%2C%20Malitbog%2C%20Southern%20Leyte!3m2!1d10.162197899999999!2d125.0005163!4m5!1s0x330737408e166a35%3A0xb9e417ece889c1f!2s',
            'Macrohon%2C%20Southern%20Leyte!3m2!1d10.0643286!2d124.9513384!4m5!1s0x330747b952d49157%3A0x6fd01a85085e4285!2sTerminal%2C%20Capt.%20Iyano%20St.%2C%20',
            `Maasin%20City%2C%20Southern%20Leyte!3m2!1d10.132173!2d124.83481409999999!4m4!2s${latitude}%2C${longitude}!3m2!1d${latitude}!2d${longitude}!5e0!3m2!1sen!2sph!4v1652595733458!5m2!1sen!2sph`
          )}
          width="100%"
          loading="lazy"
          style={{ border: '0', height: '100vh' }}></iframe>
        {/* <pre>{JSON.stringify(data?.data?.trackers, null, 2)}</pre> */}
      </main>
    </React.Fragment>
  )
}

export default Map
