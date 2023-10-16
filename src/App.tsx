import { ApolloProvider } from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { chakraTheme } from "@/config"
import { apolloClient } from "@/lib/graphql"
import { AddPersonPage } from "@/components/add-person-page"
import { ContactListProvider } from "@/components/contact-list-provider"
import { Container } from "@/components/container"
import { HomePage } from "@/components/home-page"

export default function App() {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ApolloProvider client={apolloClient}>
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
