import { ApolloClient, InMemoryCache } from "@apollo/client"

import { gql } from "@/types/__generated__"
import { type GetContactListQuery } from "@/types/__generated__/graphql"

export function groupContactsByFirstLetter(
  contacts: GetContactListQuery["contact"],
) {
  const result: Record<string, GetContactListQuery["contact"]> = {}

  const sortedContacts = contacts.sort((a, b) =>
    a.first_name.localeCompare(b.first_name),
  )

  sortedContacts.forEach((contact) => {
    const firstLetter = contact.first_name.charAt(0).toUpperCase()

    if (!(firstLetter in result)) {
      result[firstLetter] = []
    }

    result[firstLetter]!.push(contact)
  })

  return result
}

export const apolloClient = new ApolloClient({
  uri: "https://wpe-hiring.tokopedia.net/graphql",
  cache: new InMemoryCache(),
})

export const queries = {
  GET_CONTACT_LIST: gql(/* GraphQL */ `
    query GetContactList(
      $distinct_on: [contact_select_column!]
      $limit: Int
      $offset: Int
      $order_by: [contact_order_by!]
      $where: contact_bool_exp
    ) {
      contact(
        distinct_on: $distinct_on
        limit: $limit
        offset: $offset
        order_by: $order_by
        where: $where
      ) {
        created_at
        first_name
        id
        last_name
        phones {
          number
        }
      }
    }
  `),
}
