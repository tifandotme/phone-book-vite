import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

export function Container() {
  return (
    <Box as="main" mx="auto" maxW="container.md">
      <Outlet />
    </Box>
  )
}
