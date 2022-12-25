import React from 'react'
import Image from 'next/image'

import handleImageError from '~/helpers/handleImageError'

type props = {
  user: any
}

const ProfileCard: React.FC<props> = (props): JSX.Element => {
  const { user } = props

  return (
    <div className="flex-1 bg-white text-center">
      <div className="overflow-hidden rounded-lg border">
        <div className="border-b border-gray-300 py-3 px-6">Employee</div>
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
              className="mx-auto mb-4 w-32 rounded-full"
              onError={(e) =>
                handleImageError(
                  e,
                  'https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=166&h=180&c=7&r=0&o=5&pid=1.7'
                )
              }
              alt={user?.displayName}
            />
            <h5 className="mb-2 text-xl font-medium leading-tight">{user?.displayName}</h5>
            <p className="font-medium text-gray-500">Bus Driver</p>
          </div>
        </div>
        <div className="border-t border-gray-300 bg-gray-50 py-3 px-6 text-sm">Clemrose</div>
      </div>
    </div>
  )
}

export default ProfileCard
