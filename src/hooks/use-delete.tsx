import { useMutation } from "@apollo/client"

import { queries } from "@/lib/graphql"

export function useDelete() {
  const [deleteContact, { data, loading, error }] = useMutation(
    queries.DELETE_CONTACT,
  )

  return { deleteContact, data, loading, error }
}
