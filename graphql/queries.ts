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