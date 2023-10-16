import React from "react"
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react"
import { flexRender } from "@tanstack/react-table"
import {
  HiMagnifyingGlass,
  HiMiniChevronDoubleLeft,
  HiMiniChevronDoubleRight,
  HiMiniChevronLeft,
  HiMiniChevronRight,
  HiMiniPlusSmall,
} from "react-icons/hi2"

import { FormattedContactList } from "@/types"
import { useTable } from "@/hooks/use-table"

export function ContactsTable({
  data,
  refetch,
}: {
  data: FormattedContactList
  refetch: () => void
}) {
  const [headerHeight, setHeaderHeight] = React.useState(0)
  const headerRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    setHeaderHeight(headerRef.current?.offsetHeight ?? 0)
  }, [])

  const table = useTable(data, refetch)

  return (
    <>
      <IconButton
        aria-label="Add new contact"
        icon={<Icon as={HiMiniPlusSmall} boxSize="10" />}
        zIndex="4"
        bgColor="blue.300"
        color="white"
        rounded="full"
        pos="fixed"
        h="60px"
        w="60px"
        textAlign="center"
        boxShadow="lg"
        right="30px"
        bottom="30px"
      />

      <Box
        ref={headerRef}
        w="full"
        top="0px"
        pos="fixed"
        zIndex="3"
        bg="white"
        borderBottomColor="gray.300"
        borderBottomWidth="thin"
        mx="auto"
        maxW="container.md"
      >
        <HStack my="4" mx="6">
          <InputGroup>
            <InputLeftElement pointerEvents="none" h="full" ml="2">
              <Icon as={HiMagnifyingGlass} boxSize="5" color="gray.600" />
            </InputLeftElement>
            <Input
              type="text"
              value={
                (table.getColumn("fullName")?.getFilterValue() ?? "") as string
              }
              onChange={(e) =>
                table.getColumn("fullName")?.setFilterValue(e.target.value)
              }
              placeholder="Search contact"
              variant="filled"
              rounded="full"
              size="lg"
              fontSize="md"
              _placeholder={{ color: "black", opacity: 0.8 }}
            />
          </InputGroup>
        </HStack>
      </Box>

      <Box mt={headerHeight} mb="14" px="4">
        <Text
          mx="4"
          mb="4"
          pt="4"
          pb="1"
          borderBottomColor="gray.200"
          borderBottomWidth="thin"
          color="gray.600"
          textTransform="uppercase"
          fontSize="xs"
        >
          {data.length + " contacts"}
        </Text>

        <TableContainer>
          <Table variant="simple">
            <Tbody>
              {table.getTopRows().map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      p="2"
                      {...cell.column.columnDef.meta?.bodyProps}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      p="2"
                      {...cell.column.columnDef.meta?.bodyProps}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Stack
          mt="10"
          direction={{ base: "column", lg: "row" }}
          gap="7"
          justifyContent={{ lg: "space-between" }}
          alignItems={{ base: "center" }}
        >
          <HStack>
            <ButtonGroup colorScheme="gray" size="xs" variant="ghost">
              <Button
                onClick={() => table.setPageIndex(0)}
                isDisabled={!table.getCanPreviousPage()}
              >
                <Icon as={HiMiniChevronDoubleLeft} boxSize="6" />
              </Button>
              <Button
                onClick={() => table.previousPage()}
                isDisabled={!table.getCanPreviousPage()}
              >
                <Icon as={HiMiniChevronLeft} boxSize="6" />
              </Button>
              <Button
                onClick={() => table.nextPage()}
                isDisabled={!table.getCanNextPage()}
              >
                <Icon as={HiMiniChevronRight} boxSize="6" />
              </Button>
              <Button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                isDisabled={!table.getCanNextPage()}
              >
                <Icon as={HiMiniChevronDoubleRight} boxSize="6" />
              </Button>
            </ButtonGroup>
          </HStack>

          <HStack>
            <Text fontSize="xs" color="gray.600">
              Page{" "}
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}{" "}
              </strong>
            </Text>
            <Select
              w="auto"
              size="xs"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  View {pageSize}
                </option>
              ))}
            </Select>
          </HStack>
        </Stack>
      </Box>
    </>
  )
}
