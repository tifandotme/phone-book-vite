import { useApolloClient } from "@apollo/client"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useFieldArray, useForm } from "react-hook-form"
import { HiMiniXMark, HiPlusSmall } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"

import { AddPersonBody } from "@/types"
import { useAddContact } from "@/hooks/use-add-contact"

export function AddPersonPage() {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors, isSubmitting },
  } = useForm<AddPersonBody>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phones: [{ number: "" }],
    },
  })

  const { fields, append } = useFieldArray({
    name: "phones",
    control,
  })

  const { addContact } = useAddContact()

  const client = useApolloClient()

  const navigate = useNavigate()

  const toast = useToast()

  const onSubmit = async ({ firstName, lastName, phones }: AddPersonBody) => {
    try {
      if (firstName.match(/[^a-zA-Z0-9]/g)) {
        throw new Error("First name must not have a special character")
      }

      await addContact({
        variables: {
          first_name: firstName,
          last_name: lastName,
          phones,
        },
      })

      client.refetchQueries({ include: "active" })

      toast({
        title: "Contact added successfully",
        status: "success",
      })

      navigate("/")
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("Uniqueness violation")) {
          toast({
            title: "Phone number already exist",
            status: "error",
          })
        } else {
          toast({
            title: "Something went wrong",
            status: "error",
          })
        }
      }
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Box
        w="full"
        top="0"
        pos="fixed"
        zIndex="3"
        mx="auto"
        maxW="container.md"
        bgColor="gray.200"
      >
        <HStack py="3" px="3" justify="space-between">
          <HStack>
            <IconButton
              onClick={() => navigate("/")}
              display="flex"
              variant="unstyled"
              aria-label="Back to homepage"
              icon={<Icon as={HiMiniXMark} boxSize="6" />}
            />
            <Text fontSize="xl">Create contact</Text>
          </HStack>
          <Button
            type="submit"
            fontSize="sm"
            colorScheme="blue"
            px="6"
            rounded="full"
            mr="1"
          >
            Save
          </Button>
        </HStack>
      </Box>
      <Box mt="100px" px="1rem">
        <FormControl>
          <FormLabel>First name</FormLabel>
          <Input
            type="text"
            {...register("firstName", {
              required: "This field cannot be empty",
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last name</FormLabel>
          <Input
            type="text"
            {...register("lastName", {
              required: "This field cannot be empty",
            })}
          />
        </FormControl>
        <VStack align="left" spacing="1">
          {fields.map((item, idx) => (
            <HStack key={item.id} align="flex-end">
              <FormControl>
                <FormLabel>Phone number</FormLabel>
                <Input
                  type="text"
                  {...register(`phones.${idx}.number`, {
                    required: "This field cannot be empty",
                  })}
                />
              </FormControl>
              {fields.length - 1 === idx && (
                <IconButton
                  variant="outline"
                  onClick={() => append({ number: "" })}
                  aria-label="Add another field"
                  icon={<Icon as={HiPlusSmall} boxSize="6" />}
                />
              )}
            </HStack>
          ))}
        </VStack>
      </Box>
    </Box>
  )
}
