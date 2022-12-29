export function THead() {
  return (
    <thead className="border-b bg-white shadow">
      <tr className="border-blue-20 bg-gray-100">
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Date
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Destination
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Departure Time
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Plate number
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          No. Passengers
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Total Earnings
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Options
        </th>
        <th
          scope="col"
          className="border-r px-6 py-4 text-left text-sm font-semibold text-gray-900">
          Live Map
        </th>
      </tr>
    </thead>
  )
}
