import React from "react"
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { chakraTheme } from "@/config"
import { setupApolloClient } from "@/lib/graphql"
import { AddPersonPage } from "@/components/add-person-page"
import { ContactListProvider } from "@/components/contact-list-provider"
import { Container } from "@/components/container"
import { HomePage } from "@/components/home-page"

export default function App() {
  const [client, setClient] =
    React.useState<ApolloClient<NormalizedCacheObject>>()

  React.useEffect(() => {
    async function init() {
      const client = await setupApolloClient()
      setClient(client)
    }

    init()
  }, [])

  if (!client) {
    return null
  }

  return (
    <ChakraProvider theme={chakraTheme}>
      <ApolloProvider client={client}>
        <ContactListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Container />}>
                <Route index element={<HomePage />} />
                <Route path="person">
                  <Route path="add" element={<AddPersonPage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ContactListProvider>
      </ApolloProvider>
    </ChakraProvider>
  )
}
