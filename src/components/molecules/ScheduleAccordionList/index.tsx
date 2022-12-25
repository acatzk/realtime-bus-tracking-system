import React from 'react'

import ScheduleAccordionItem from './ScheduleAccordionItem'

type props = {
  trackers: any
}

const ScheduleAccordionList: React.FC<props> = ({ trackers }): JSX.Element => {
  return (
    <div className="mt-2 divide-y overflow-hidden rounded-lg border border-gray-200 bg-white">
      {trackers?.map(ScheduleAccordionItem)}
    </div>
  )
}

export default ScheduleAccordionList
