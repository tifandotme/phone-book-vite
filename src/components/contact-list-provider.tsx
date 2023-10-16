import { useQuery } from "@apollo/client"

import { Order_By } from "@/types/__generated__/graphql"
import { QueryResultContext } from "@/lib"
import { queries } from "@/lib/graphql"

export function ContactListProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data, error, loading, refetch } = useQuery(queries.GET_CONTACT_LIST, {
    variables: {
      order_by: { first_name: Order_By.Asc },
    },
  })

  const value = { queryData: { data, error, loading }, refetch }

  return (
    <QueryResultContext.Provider value={value}>
      {children}
    </QueryResultContext.Provider>
  )
}
