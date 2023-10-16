import React from "react"
import {
  Avatar,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowPinningState,
  useReactTable,
} from "@tanstack/react-table"
import {
  HiMiniEllipsisVertical,
  HiOutlineStar,
  HiOutlineTrash,
  HiStar,
} from "react-icons/hi2"

import { FormattedContactList } from "@/types"
import { useDelete } from "@/hooks/use-delete"

export function useTable(data: FormattedContactList, refetch: () => void) {
  const [rowPinning, setRowPinning] = React.useState<RowPinningState>({
    top: [],
  })

  const { deleteContact } = useDelete()

  const table = useReactTable({
    data,
    columns: [
      {
        header: "",
        accessorKey: "group",
        maxSize: 4,
        cell: ({ row }) => {
          if (row.original.is_first) {
            return (
              <Text
                w="full"
                fontWeight="semibold"
                align="center"
                color="blue.500"
                fontSize="lg"
              >
                {row.original.first_name.charAt(0).toUpperCase()}
              </Text>
            )
          }

          return null
        },
      },
      {
        header: "Name",
        accessorKey: "fullName",
        accessorFn: (row) => row.first_name + " " + row.last_name,
        maxSize: 4,
        cell: ({ row }) => {
          const avatarBgs = [
            "red.200",
            "orange.200",
            "yellow.200",
            "green.200",
            "teal.200",
            "blue.200",
            "purple.200",
            "pink.200",
          ]

          const avatarBg = avatarBgs[row.index % avatarBgs.length]

          return (
            <HStack align="flex-start" my="2">
              <Avatar
                name={row.original.first_name.charAt(0)}
                color="gray.600"
                bgColor={avatarBg}
              />
              <VStack alignItems="left" gap="1">
                <Text maxW="100px">
                  {row.original.first_name + " " + row.original.last_name}
                </Text>
                {row.original.phones.length !== 0 && (
                  <Text fontSize="xs" color="gray.700">
                    {row.original.phones[0]!.number}
                  </Text>
                )}
              </VStack>
            </HStack>
          )
        },
        meta: {
          bodyProps: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "150px",
          },
        },
      },
      {
        header: "",
        accessorKey: "actions",
        maxSize: 1,
        cell: ({ row }) => {
          const isFavorite = row.getIsPinned() === "top"

          return (
            <Menu autoSelect={false}>
              <MenuButton
                as={IconButton}
                variant="ghost"
                icon={
                  <Icon
                    as={HiMiniEllipsisVertical}
                    boxSize="5"
                    color="gray.7 00"
                  />
                }
              />
              <MenuList minW="0" w="max-content">
                <MenuItem
                  onClick={() => {
                    isFavorite ? row.pin(false) : row.pin("top")
                  }}
                  icon={
                    <Icon
                      as={isFavorite ? HiStar : HiOutlineStar}
                      boxSize="4"
                    />
                  }
                >
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    deleteContact({ variables: { id: row.original.id } })
                    refetch()
                  }}
                  icon={<Icon as={HiOutlineTrash} boxSize="4" />}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          )
        },
        meta: {
          bodyProps: {
            textAlign: "right",
          },
        },
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowPinning,
    },
    onRowPinningChange: setRowPinning,
    debugTable: false,
  })

  return table
}
