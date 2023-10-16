import { formatContactList } from "@/lib"
import { useContactListContext } from "@/hooks/use-contact-list-context"
import { ContactsTable } from "@/components/contacts-table"

export function HomePage() {
  const { queryData, refetch } = useContactListContext()

  const { data, error, loading } = queryData

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error : {error.message}</p>

  if (!data?.contact) return <p>No contacts found. Start adding one.</p>

  return (
    <ContactsTable data={formatContactList(data.contact)} refetch={refetch} />
  )
}
