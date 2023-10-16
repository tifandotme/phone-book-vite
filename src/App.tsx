import { ApolloProvider } from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { chakraTheme } from "@/config"
import { apolloClient } from "./lib/graphql"
import { HomePage } from "@/components/home-page"
import { Container } from "@/components/container"

export default function App() {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Container />}>
              <Route index element={<HomePage />} />
              {/* <Route path="person">
              <Route path=":id" element={<DetailPage />} />
            </Route> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </ChakraProvider>
  )
}
