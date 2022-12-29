import create from 'zustand'

import { nhost } from '~/lib/nhost-client'
import { GET_ALL_BUSSES } from '~/graphql/queries'
import { IDestination } from '~/shared/interfaces'

let store = (set: any) => ({
  busses: [],
  users: [
    { id: 1, name: 'Teyim Asobo' },
    { id: 2, name: 'Fru Brian' }
  ],
  fetchBusses: async (): Promise<void> => {
    const { data } = await nhost.graphql.request(GET_ALL_BUSSES)
    set({ busses: data?.data?.busses as IDestination[] })
  },
  fetchUser: async (endpoint: string) => {
    const reponse = await fetch(endpoint)
    const userData = await reponse.json()
    set({ users: userData })
  }
})

export const useBearStore = create(store)
