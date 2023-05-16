import useSWR from 'swr'
import React from 'react'
import moment from 'moment'
import { Spinner } from '~/utils'
import classNames from 'classnames'
import type { NextPage } from 'next'
import { FaLocationArrow } from 'react-icons/fa'
import { AiOutlineSchedule } from 'react-icons/ai'

import { nhost } from '~/lib/nhost-client'
import PageLayout from '~/components/templates/PageLayout'
import ScheduleList from '~/components/molecules/ScheduleList'
import { GET_DRIVER_LOCATION_BY_CURRENT_DATE } from '~/graphql/queries'
import ScheduleAccordionList from '~/components/molecules/ScheduleAccordionList'
import { RefreshCcw } from 'react-feather'

const Index: NextPage = (): JSX.Element => {
  const address = GET_DRIVER_LOCATION_BY_CURRENT_DATE
  const fetcher = async (query: string) =>
    await nhost.graphql.request(query, {
      date_created: moment().format('YYYY-MM-DD')
    })
  const options = {
    refreshInterval: 1000,
    revalidateOnMount: true
  }

  const { data, error } = useSWR(address, fetcher, options)

  if (error)
    return (
      <p className="rounded bg-yellow-300 py-2 px-4 text-center text-sm font-medium">
        Loading failed...
      </p>
    )

  return (
    <PageLayout>
      <main className="mx-auto min-h-[81vh] px-4 md:max-w-2xl md:px-8 lg:max-w-7xl lg:px-16">
        <section className="py-2 md:py-8 lg:py-14">
          <div className="container">
            <div className="flex items-center space-x-2">
              <AiOutlineSchedule className="h-6 w-6 text-gray-700 md:h-8 md:w-8" />
              <h1 className="py-3 text-base font-bold text-gray-700 md:text-xl">
                Daily Bus Schedules
              </h1>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="max-w-full overflow-x-auto">
                  {data ? (
                    <>
                      <div className="hidden md:block">
                        <ScheduleList
                          {...{
                            trackers: data?.data?.trackers,
                            from: 'public'
                          }}
                        />
                      </div>
                      <div className="block md:hidden">
                        {data?.data?.trackers?.length !== 0 ? (
                          <ScheduleAccordionList
                            {...{
                              trackers: data?.data?.trackers,
                              from: 'public'
                            }}
                          />
                        ) : (
                          <h1 className="rounded bg-yellow-300 py-2 px-4 text-center text-sm font-medium">
                            No Active Driver
                          </h1>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center py-10">
                      <Spinner className="h-6 w-6 md:h-8 md:w-8" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {data?.data?.trackers.length !== 0 && (
          <section className="py-8">
            <h2 className="text-lg font-semibold">
              First Active Bus Schedule - <b>{data?.data?.trackers[0]?.destination}</b>
            </h2>
            <iframe
              src={classNames(
                'https://www.google.com/maps/embed?pb=!1m63!1m12!1m3!1d211336.5274202848!2d124.9564999608942!3d10.18712418942519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m48!3e0!4m5!1s0x3306d64c5cbfa0c9%3A0x9e2dfff5921bd759!2s',
                'Kinachawa%2C%20Southern%20Leyte!3m2!1d10.0188847!2d125.2450647!4m5!1s0x3306d67df873560f%3A0xbc4397c55f417f36!2s',
                'San%20Ricardo%2C%20Southern%20Leyte!3m2!1d9.9769939!2d125.2738186!4m5!1s0x3306d5debfcc7733%3A0x61c9d9a09d6edbd7!2s',
                'Pintuyan%2C%20Southern%20Leyte!3m2!1d9.99513!2d125.2258365!4m5!1s0x330711c59ca30769%3A0x2a3fd238fb08613c!2sDr.%20Gonzalo%20Yong%20Memorial%20Bus%20Terminal%2C%20Osme%C3%B1a%20Street%2C%20Sogod%2C%206606%2',
                'Southern%20Leyte!3m2!1d10.384186!2d124.9829407!4m5!1s0x33073b7eb054d58f%3A0x41f4184f8f60812e!2s',
                'Malitbog%20Main%20Road%2C%20Malitbog%2C%20Southern%20Leyte!3m2!1d10.162197899999999!2d125.0005163!4m5!1s0x330737408e166a35%3A0xb9e417ece889c1f!2s',
                'Macrohon%2C%20Southern%20Leyte!3m2!1d10.0643286!2d124.9513384!4m5!1s0x330747b952d49157%3A0x6fd01a85085e4285!2sTerminal%2C%20Capt.%20Iyano%20St.%2C%20',
                `Maasin%20City%2C%20Southern%20Leyte!3m2!1d10.132173!2d124.83481409999999!4m4!2s${data?.data?.trackers[0]?.latitude}%2C${data?.data?.trackers[0]?.longitude}!3m2!1d${data?.data?.trackers[0]?.latitude}!2d${data?.data?.trackers[0]?.longitude}!5e0!3m2!1sen!2sph!4v1652595733458!5m2!1sen!2sph`
              )}
              width="100%"
              loading="lazy"
              style={{ border: '0', height: '100vh' }}></iframe>
          </section>
        )}
      </main>
    </PageLayout>
  )
}

export default Index
