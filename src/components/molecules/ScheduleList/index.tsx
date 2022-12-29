import React from 'react'

import { THead } from './THead'
import Schedule from './ScheduleItem'
import { TFoot } from './TFoot'

type props = {
  trackers: any
  from: string
}

const ScheduleList: React.FC<props> = ({ trackers, from }): JSX.Element => {
  return (
    <table className="relative w-full table-auto">
      <THead />
      <tbody>
        {trackers?.map((track: any, i: number) => (
          <Schedule
            key={i}
            {...track}
            {...{
              from
            }}
          />
        ))}
      </tbody>
      {trackers?.length === 0 && <TFoot />}
    </table>
  )
}

export default ScheduleList
