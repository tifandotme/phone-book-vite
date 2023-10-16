/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react"

import { QueryContextValue } from "@/types"
import { QueryResultContext } from "@/lib"

export function useContactListContext<TData = any>(): QueryContextValue<TData> {
  const context = React.useContext(QueryResultContext)
  if (!context) {
    throw new Error("useQueryResult must be used within a QueryResultProvider")
  }
  return context
}
