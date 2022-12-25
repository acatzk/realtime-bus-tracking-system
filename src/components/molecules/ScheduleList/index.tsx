import React from 'react'

import { THead } from './THead'
import Schedule from './ScheduleItem'
import { TFoot } from './TFoot'

type props = {
  trackers: any
}

const ScheduleList: React.FC<props> = ({ trackers }): JSX.Element => {
  return (
    <table className="relative w-full table-auto">
      <THead />
      <tbody>{trackers?.map(Schedule)}</tbody>
      {trackers?.length === 0 && <TFoot />}
    </table>
  )
}

export default ScheduleList
