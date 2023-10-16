import { useQuery } from "@apollo/client"

import { Order_By } from "@/types/__generated__/graphql"
import { formatContactList } from "@/lib"
import { queries } from "@/lib/graphql"
import { ContactsTable } from "@/components/contacts-table"

export function HomePage() {
  const { loading, error, data, refetch } = useQuery(queries.GET_CONTACT_LIST, {
    variables: {
      order_by: { first_name: Order_By.Asc },
    },
  })

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error : {error.message}</p>

  if (!data?.contact) return <p>No contacts found. Start adding one.</p>

  return (
    <ContactsTable data={formatContactList(data.contact)} refetch={refetch} />
  )
}
