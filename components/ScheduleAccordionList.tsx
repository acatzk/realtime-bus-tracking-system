import React from 'react'
import ScheduleAccordionItem from './ScheduleAccordionItem'

type props = {
  trackers: any
}

const ScheduleAccordionList: React.FC<props> = ({ trackers }) => {
  if (!trackers) return null

  return (
    <div className="mt-2 bg-white border border-gray-200 rounded-lg overflow-hidden divide-y">
      {trackers?.map(ScheduleAccordionItem)}
    </div>
  )
}

export default ScheduleAccordionList
