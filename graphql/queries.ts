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
  query checkIfDriverAlreadyTracked($user_id: uuid!, $created_at: date!) {
    trackers_aggregate(where: {user_id: {_eq: $user_id}, created_at: {_eq: $created_at}}) {
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
  query getDriverLocation($created_at: date!) {
    trackers(where: {created_at: {_eq: $created_at}, isActive: {_eq: true}}, order_by: {created_at_with_time: desc}) {
      id
      user_id
      plate_number
      destination
      created_at_with_time
      latitude
      longitude
      user {
        id
        displayName
        avatarUrl
      }
    }
  }
`

export const GET_TRACK_IF_EXIST_AND_STATUS = gql`
  query getTracker($user_id: uuid!, $created_at: date!) {
    trackers(where: {user_id: {_eq: $user_id}, created_at: {_eq: $created_at}}) {
      id
      isActive
    }
    trackers_aggregate(where: {user_id: {_eq: $user_id}, created_at: {_eq: $created_at}}) {
      aggregate {
        count
      }
    }
  }
`