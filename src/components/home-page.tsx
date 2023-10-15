import { useQuery } from "@apollo/client"

import { groupContactsByFirstLetter, queries } from "@/lib"
import { Avatar } from "@/components/ui/avatar"

export function HomePage() {
  const { loading, error, data } = useQuery(queries.GET_CONTACT_LIST)

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error : {error.message}</p>

  if (!data?.contact) return <p>No contacts found. Start adding one.</p>

  const groupedContacts = groupContactsByFirstLetter(data.contact)

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {Object.entries(groupedContacts).map(([letter, contacts]) => (
        <div key={letter}>
          <h2>{letter}</h2>
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              border: "1px solid green",
            }}
          >
            {contacts.map((contact) => (
              <div
                key={contact.id}
                css={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Avatar name={contact.first_name} />
                <div>
                  <p>{contact.first_name + " " + contact.last_name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
