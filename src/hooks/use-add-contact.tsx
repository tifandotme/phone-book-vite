import { useMutation } from "@apollo/client"

import { queries } from "@/lib/graphql"

export function useAddContact() {
  const [addContact, { data, loading, error }] = useMutation(
    queries.ADD_CONTACT,
  )

  return { addContact, data, loading, error }
}
