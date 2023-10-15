import { ApolloProvider } from "@apollo/client"
import { Global, ThemeProvider } from "@emotion/react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { apolloClient } from "@/lib"
import { theme } from "@/styles"
import { HomePage } from "@/components/home-page"
import { PanelContainer } from "@/components/panel-container"

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PanelContainer />}>
              <Route index element={<HomePage />} />
              {/* <Route path="person">
              <Route path=":id" element={<DetailPage />} />
            </Route> */}
            </Route>
          </Routes>
        </BrowserRouter>
        <Global styles={theme.global} />
      </ApolloProvider>
    </ThemeProvider>
  )
}
