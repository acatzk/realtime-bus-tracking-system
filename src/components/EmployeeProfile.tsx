import React from 'react'
import Image from 'next/image'

type props = {
  user: any
}

const EmployeeProfile: React.FC<props> = (props): JSX.Element => {
  const { user } = props

  return (
    <div className="bg-white text-center flex-1">
      <div className="border rounded-lg overflow-hidden">
        <div className="py-3 px-6 border-b border-gray-300">Employee</div>
        <div className="p-6">
          <div className="text-center">
            <Image
              src={
                user
                  ? user?.avatarUrl
                  : 'https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7'
              }
              width={128}
              height={128}
              className="rounded-full w-32 mb-4 mx-auto"
              alt={user?.displayName}
            />
            <h5 className="text-xl font-medium leading-tight mb-2">{user?.displayName}</h5>
            <p className="text-gray-500 font-medium">Bus Driver</p>
          </div>
        </div>
        <div className="py-3 px-6 border-t border-gray-300 text-sm bg-gray-50">
          Clementina Bus Corp.
        </div>
      </div>
    </div>
  )
}

export default EmployeeProfile
