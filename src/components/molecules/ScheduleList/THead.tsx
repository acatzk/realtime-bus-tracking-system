export function THead() {
  return (
    <thead>
      <tr className="bg-secondary text-center">
        <th
          className="
            w-1/3
            min-w-[160px]
            border-l
            border-transparent
            py-4
            px-3
            text-base
            font-semibold
            text-white
            md:text-lg
            lg:py-7 lg:px-4
          ">
          Destination
        </th>
        <th
          className="
            w-1/3
            min-w-[160px]
            border-l
            border-transparent
            py-4
            px-3
            text-base
            font-semibold
            text-white
            md:text-lg
            lg:py-7 lg:px-4
          ">
          Driver
        </th>
        <th
          className="
            w-1/3
            min-w-[160px]
            border-l
            border-transparent
            py-4
            px-3
            text-base
            font-semibold
            text-white
            md:text-lg
            lg:py-7 lg:px-4
          ">
          Departure Time
        </th>
        <th
          className="
            w-1/3
            min-w-[160px]
            py-4
            px-3
            text-base
            font-semibold
            text-white
            md:text-lg
            lg:py-7
            lg:px-4
          ">
          Plate Number
        </th>
        <th
          className="
            w-1/6
            min-w-[160px]
            py-4
            px-3
            text-base
            font-semibold
            text-white
            md:text-lg
            lg:py-7
            lg:px-4
          ">
          Track Location
        </th>
      </tr>
    </thead>
  )
}
