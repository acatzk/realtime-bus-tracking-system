export interface ITrack {
  id: string
  user: {
    displayName: string
    avatarUrl: string
  }
  destination: string
  plate_number: string
  departure_time: string
  date_created: string
  passengers: IPassenger[]
  passengers_aggregate: IAggregate
  latitude: number
  longitude: number
}

export interface IPassenger {
  id: string
  name: string
  amount: number
}

export interface IAggregate {
  aggregate: {
    count: number
  }
}