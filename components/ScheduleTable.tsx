import React from 'react'
import Image from 'next/image'

type props = {
  schedules: any
}

const ScheduleTable: React.FC<props> = (props) => {
  const { schedules } = props
  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="bg-[#3f3a83] text-center">
          <th
            className="
              w-1/3
              min-w-[160px]
              text-base
              md:text-lg
              font-semibold
              text-white
              py-4
              lg:py-7
              px-3
              lg:px-4
              border-l border-transparent
            "
          >
            Driver&apos;s Name
          </th>
          <th
            className="
              w-1/3
              min-w-[160px]
              text-base
              md:text-lg
              font-semibold
              text-white
              py-4
              lg:py-7
              px-3
              lg:px-4
            "
          >
            Plate Number
          </th>
          <th
            className="
              w-1/6
              min-w-[160px]
              text-base
              md:text-lg
              font-semibold
              text-white
              py-4
              lg:py-7
              px-3
              lg:px-4
            "
          >
            Track Location
          </th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule, i) => (
          <tr key={i}>
            <td
              className="
                text-center text-dark
                font-medium
                text-sm
                md:text-base
                py-5
                px-2
                bg-[#F3F6FF]
                border-b border-l border-[#E8E8E8]
                flex items-center flex-wrap space-x-1 md:space-x-3 justify-center
              "
            >
              <div className="relative">
                <Image
                  src={schedule.avatar}
                  width={40}
                  height={40}
                  className="rounded-full border"
                  alt="avatar"
                />
              </div>
              <span>{schedule.display_name}</span>
            </td>
            <td
              className="
                text-center text-dark
                font-bold
                text-base
                py-5
                px-2
                bg-white
                border-b border-[#E8E8E8]
              "
            >
              {schedule.placeNumber}
            </td>
            <td
              className="
                text-center text-dark
                font-medium
                text-base
                py-5
                px-2
                bg-[#F3F6FF]
                border-b border-[#E8E8E8]
              "
            >
              <a
                href={`/${schedule.id}`}
                className="text-sm hover:underline text-blue-500"
              >
                See live map
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ScheduleTable
