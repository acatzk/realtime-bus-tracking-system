import React from 'react'

import ScheduleAccordionItem from './ScheduleAccordionItem'

type props = {
  trackers: any
  from: string
}

const ScheduleAccordionList: React.FC<props> = ({ trackers, from }): JSX.Element => {
  return (
    <div className="mt-2 divide-y overflow-hidden rounded-lg border border-gray-200 bg-white">
      {trackers?.map((track: any, i: number) => (
        <ScheduleAccordionItem
          key={i}
          {...track}
          {...{
            from
          }}
        />
      ))}
    </div>
  )
}

export default ScheduleAccordionList
