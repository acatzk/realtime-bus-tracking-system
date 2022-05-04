import React, { useEffect } from 'react'
import { useSignOut, useAccessToken, useAuthenticated, useUserData } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import { nhost } from 'lib/nhost-client'
import { gql } from 'graphql-request'
import useSWR from 'swr'
import Image from 'next/image'

const GET_AGGREGATE_TOTAL_INCOME_SUM_QUERY = gql`
  query getAggregateTotalIncomeSum($user_id: uuid!) {
    total_income_aggregate(where: { user_id: { _eq: $user_id } }) {
      aggregate {
        sum {
          sum
        }
      }
    }
  }
`

const temporarypage: React.FC = () => {
  const router = useRouter()
  const signOut = useSignOut()
  const isAuthenticated = useAuthenticated()
  const user = useUserData()
  const accessToken = useAccessToken()

  const handleSignOut = () => signOut.signOut()

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) router.push('/')
  }, [isAuthenticated])

  // const { loading, data, error } = useQuery(GET_AGGREGATE_TOTAL_INCOME_SUM_QUERY, { user_id: user?.id})

  const { data, mutate } = useSWR(
    [GET_AGGREGATE_TOTAL_INCOME_SUM_QUERY, user?.id],
    (query, user_id) => nhost.graphql.request(query, { user_id }),
    { revalidateOnMount: true }
  )

  return (
    <div>
      <div className="flex flex-col">
        <div>Welcome authenticated User </div>
        <button
          onClick={handleSignOut}
          type="button"
          className="bg-blue-500 py-1 px-1 rounded text-white">
          Logout
        </button>
      </div>
      <div>
        <h1>Name: {user?.displayName}</h1>
        <h2>
          Access Token: <pre>{JSON.stringify(accessToken, null, 2)}</pre>
        </h2>
        <h4>
          User: <pre>{JSON.stringify(user, null, 2)}</pre>
        </h4>
      </div>

      <pre>{JSON.stringify(data?.data, null, 2)}</pre>
      <p>{data?.data?.total_income_aggregate?.aggregate?.sum?.sum}</p>
      <div>
        Avatar: {user?.avatarUrl?.toString()}
        <Image
          src={
            user
              ? user?.avatarUrl?.toString()
              : 'https://th.bing.com/th/id/OIP.o5hnVgDkhrAIKPAUMAtzcAHaHa?w=211&h=211&c=7&r=0&o=5&pid=1.7'
          }
          width={32}
          height={32}
          className="rounded-full"
          layout="intrinsic"
          quality={75}
          alt="avatar"
        />
      </div>
    </div>
  )
}

export default temporarypage
