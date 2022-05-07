import { gql } from 'graphql-request'

export const CREATE_BUS_TRACKER_MUTATION = gql`
  mutation createBusTrackerMutation($user_id: uuid!, $plate_number: String!, $longitude: numeric!, $latitude: numeric!, $destination: String!) {
    insert_trackers_one(object: {user_id: $user_id, plate_number: $plate_number, longitude: $longitude, latitude: $latitude, destination: $destination}) {
      id
      user_id
      isActive
    }
  }
`

export const UPDATE_BUS_DRIVER_STATUS_MUTATION = gql`
  mutation updateEmployeeStatus($isActive: Boolean!, $user_id: uuid!, $date: date!) {
    update_trackers(_set: {isActive: $isActive}, where: {user_id: {_eq: $user_id}, created_at: {_eq: $date}}) {
      affected_rows
      returning {
        id
        isActive
      }
    }
  }
`

export const UPDATE_DRIVERS_TRACK = gql`
  mutation updateDriverInfo($user_id: uuid!, $destination: String!, $plate_number: String!) {
    update_trackers(where: {user_id: {_eq: $user_id}}, _set: {plate_number: $plate_number, destination: $destination}) {
      returning {
        id
        user_id
        user {
          id
          email
        }
      }
    }
  }
`