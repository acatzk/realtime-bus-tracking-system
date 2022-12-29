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

export interface IDestination {
  id: number
  name: string
}
