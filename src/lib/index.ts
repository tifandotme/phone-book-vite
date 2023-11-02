/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react"
import { ApolloQueryResult } from "@apollo/client"

import { QueryContextValue } from "@/types"
import { type GetContactListQuery } from "@/types/__generated__/graphql"

export function formatContactList(data: GetContactListQuery["contact"]) {
  const result = data.map((contact, idx) => {
    const currLetter = contact.first_name.charAt(0).toLowerCase()
    const prevLetter = data[idx - 1]?.first_name.charAt(0).toLowerCase()

    return {
      ...contact,
      is_first: currLetter !== prevLetter,
    }
  })

  return result
}

export const QueryResultContext = React.createContext<QueryContextValue<any>>({
  queryData: { loading: true },
  refetch: () => Promise.resolve({} as ApolloQueryResult<any>),
})
