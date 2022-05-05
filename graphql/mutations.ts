import { gql } from 'graphql-request'

export const CREATE_BUS_TRACKER_MUTATION = gql`
  mutation createBusTrackerMutation($user_id: uuid!, $plate_number: String!, $longitude: numeric!, $latitude: numeric!, $destination: String!) {
    insert_trackers(objects: {user_id: $user_id, plate_number: $plate_number, longitude: $longitude, latitude: $latitude, destination: $destination}) {
      affected_rows
      returning {
        id
        user_id
        isActive
      }
    }
  }
`