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
  query checkIfDriverAlreadyTracked($created_at: date!) {
    trackers_aggregate(where: {created_at: {_eq: $created_at}}) {
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