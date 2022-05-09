import { gql } from 'graphql-request'

export const GET_USER_ROLE_BY_EMAIL = gql`
  query getUserRoleByEmail($email: citext!){
    users(where: {email: {_eq: $email}}) {
      id
      displayName
      roles {
        role
      }
    }
  }
`

export const CHECK_EMPLOYEE_IF_ALREADY_TRACK = gql`
  query checkIfDriverAlreadyTracked($user_id: uuid!, $date_created: date!) {
    trackers_aggregate(where: {user_id: {_eq: $user_id}, date_created: {_eq: $date_created}, isDeleted: {_eq: false}}) {
      aggregate {
        count
      }
    }
  }
`

export const GET_TRACKER_STATUS = gql`
  query getTrackerStatus($user_id: uuid!, $created_at: date!) {
    trackers(where: {user_id: {_eq: $user_id}, created_at: {_eq: $created_at}}) {
      id
      isActive
    }
  }
`

export const GET_DRIVER_LOCATION_BY_CURRENT_DATE = gql`
  query getDriverLocation($date_created: date!) {
    trackers(where: {date_created: {_eq: $date_created}, isActive: {_eq: true}, isDeleted: {_eq: false}}) {
      id
      user_id
      plate_number
      destination
      latitude
      longitude
      date_created
      departure_time
      user {
        id
        displayName
        avatarUrl
      }
    }
  }
`

export const GET_TRACK_IF_EXIST_AND_STATUS = gql`
  query getTracker($user_id: uuid!, $date_created: date!) {
    trackers(where: {user_id: {_eq: $user_id}, date_created: {_eq: $date_created}, isDeleted: {_eq: false}}) {
      id
      isActive
    }
    trackers_aggregate(where: {user_id: {_eq: $user_id}, date_created: {_eq: $date_created}, isDeleted: {_eq: false}}) {
      aggregate {
        count
      }
    }
  }
`

export const GET_TRACKER_RECORDS_BY_USER_ID = gql`
  query getTrackerRecordByUserId($user_id: uuid!) {
    trackers(where: {isDeleted: {_eq: false}, user_id: {_eq: $user_id}}, order_by: {date_created: desc}, limit: 35) {
      id
      destination
      plate_number
      departure_time
      date_created
    }
  }
`