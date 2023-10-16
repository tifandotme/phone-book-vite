/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApolloQueryResult } from "@apollo/client"

import { formatContactList } from "@/lib"

export type FormattedContactList = ReturnType<typeof formatContactList>

export type AddPersonBody = {
  firstName: string
  lastName: string
  phones: { number: string }[]
}

export interface QueryResult<TData> {
  data?: TData
  error?: any
  loading: boolean
}

export interface QueryContextValue<TData> {
  queryData: QueryResult<TData>
  refetch: () => Promise<ApolloQueryResult<TData>>
}
