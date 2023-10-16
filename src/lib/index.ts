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

export function isObjectEmpty(obj: Record<string | number | symbol, unknown>) {
  return Object.keys(obj).length === 0
}
