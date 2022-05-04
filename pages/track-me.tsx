import DashboardLayout from 'layouts/DashboardLayout'
import { NextPage } from 'next'
import React from 'react'

const TrackMe: NextPage = () => {
  return (
    <DashboardLayout metaHead="| Dashboard">
      <main className="min-h-[81vh] px-4 md:px-8 lg:px-16 md:max-w-2xl lg:max-w-7xl mx-auto">
        <div className="mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo animi
          ullam, eum quibusdam numquam nostrum consectetur magnam, vel
          distinctio sit, est placeat dolor neque! Ab quae ullam numquam?
          Excepturi, consequatur.
        </div>
      </main>
    </DashboardLayout>
  )
}

export default TrackMe
