import { Spinner, Stack } from "@chakra-ui/react"

export function FullscreenSpinner() {
  return (
    <Stack
      alignItems="center"
      height="100vh"
      justifyContent="center"
      zIndex="99"
    >
      <Spinner
        color="blue.400"
        emptyColor="red.100"
        size={{ base: "md", sm: "lg" }}
        thickness="4px"
        speed="0.7s"
      />
    </Stack>
  )
}
