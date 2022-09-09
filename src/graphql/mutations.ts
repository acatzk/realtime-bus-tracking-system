import { gql } from 'graphql-request'

export const CREATE_BUS_TRACKER_MUTATION = gql`
  mutation createBusTrackerMutation($plate_number: String!, $longitude: numeric!, $latitude: numeric!, $destination: String!, $departure_time: String!, $date_created: date!) {
    insert_trackers_one(object: {plate_number: $plate_number, longitude: $longitude, latitude: $latitude, destination: $destination, departure_time: $departure_time, date_created: $date_created}) {
      id
      user_id
      isActive
    }
  }
`

export const UPDATE_BUS_DRIVER_STATUS_MUTATION = gql`
  mutation updateEmployeeStatus($isActive: Boolean!, $user_id: uuid!, $date_created: date!) {
    update_trackers(_set: {isActive: $isActive}, where: {user_id: {_eq: $user_id}, date_created: {_eq: $date_created}}) {
      affected_rows
      returning {
        id
        isActive
      }
    }
  }
`

export const UPDATE_BUS_DRIVER_STATUS_BY_PK = gql`
  mutation updateEmployeeStatus($id: uuid!, $isActive: Boolean) {
    update_trackers_by_pk(pk_columns: {id: $id}, _set: {isActive: $isActive}) {
      id
      user_id
    }
  }
`

export const UPDATE_DRIVER_BY_PK_ID = gql`
  mutation updateDriverByPkId($id: uuid!, $destination: String!, $plate_number: String!, $departure_time: String!) {
    update_trackers_by_pk(pk_columns: {id: $id}, _set: {plate_number: $plate_number, destination: $destination, departure_time: $departure_time}) {
      id
      user_id
    }
  }
`

export const DELETE_DRIVER_BY_PK_ID = gql`
  mutation updateDriverIsDeletedByPkId($id: uuid!) {
    update_trackers_by_pk(pk_columns: {id: $id}, _set: {isDeleted: true}) {
      id
      user_id
      user {
        id
        email
      }
    }
  }
`

export const UPDATE_USER_BY_PK_ID = gql`
  mutation updateUserByPkId($id: uuid!, $avatarUrl: String, $displayName: String!, $email: citext!, $phoneNumber: String) {
    updateUser(pk_columns: {id: $id}, _set: {avatarUrl: $avatarUrl, displayName: $displayName, email: $email, phoneNumber: $phoneNumber}) {
      id
      avatarUrl
      displayName
      email
      phoneNumber
    }
  }
`

export const UPDATE_TRACKER_BY_PK_ID = gql`
  mutation updateTrackByPkId($id: uuid!, $latitude: numeric!, $longitude: numeric!) {
    update_trackers_by_pk(pk_columns: {id: $id}, _set: {latitude: $latitude, longitude: $longitude}) {
      user_id
      latitude
      longitude
    }
  }
`