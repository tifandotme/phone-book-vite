import { ApolloClient, InMemoryCache } from "@apollo/client"

import { gql } from "@/types/__generated__"

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
  DELETE_CONTACT: gql(/* GraphQL */ `
    mutation MyMutation($id: Int!) {
      delete_contact_by_pk(id: $id) {
        first_name
        last_name
        id
      }
    }
  `),
  ADD_CONTACT: gql(/* GraphQL */ `
    mutation AddContactWithPhones(
      $first_name: String!
      $last_name: String!
      $phones: [phone_insert_input!]!
    ) {
      insert_contact(
        objects: {
          first_name: $first_name
          last_name: $last_name
          phones: { data: $phones }
        }
      ) {
        returning {
          first_name
          last_name
          id
          phones {
            number
          }
        }
      }
    }
  `),
}
