import { useQuery } from '@tanstack/react-query'

import { nhost } from '~/lib/nhost-client'
import { GET_TRACKER_BY_ID } from '~/graphql/queries'

export type ITrackLocation = {
  id: string
  longitude: number
  latitude: number
}

const useLocateBusMap = () => {
  const getTrackBus = (id: string) =>
    useQuery({
      queryKey: ['GET_TRACKER_BY_ID'],
      queryFn: async () =>
        await nhost.graphql.request(GET_TRACKER_BY_ID, {
          id: {
            _eq: id as string
          }
        }),
      select: (data) => ({
        data: data?.data?.trackers as ITrackLocation[]
      })
    })

  return {
    getTrackBus
  }
}

export default useLocateBusMap
