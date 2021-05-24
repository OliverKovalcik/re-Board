import * as React from 'react'
import {
  VStack,
  HStack,
  Box,
  Heading,
  Center,
  Button,
  Text,
  Input,
  Container,
  Stack,
  Icon,
  SimpleGrid,
  Grid,
  Select,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import reactCSS from 'reactcss'
import { CirclePicker } from 'react-color'
import { getBoards, createBoard, removeBoard } from '../../utils/api'
import { useFetch } from '../../hooks'

export const InitialLaunch = () => {
  const { error, isLoading, setIsLoading } = useFetch()
  const [newBoardName, setNewBoardName] = React.useState('')
  const handleBoardCreation = () => {
    const date = new Date()
    try {
      fetch(
        createBoard(
          newBoardName,
          date.toLocaleString('en-US', {
            day: 'numeric', // numeric, 2-digit
            year: 'numeric', // numeric, 2-digit
            month: 'long', // numeric, 2-digit, long, short, narrow
          })
        )
      ).then((result) => {
        const fetchData = async () => {
        const data = await getBoards()
        setBoards(data)
        if (data.length === 0) {
          setInitialPage(true)
        } else {
          setInitialPage(false)
        }
      })
    } catch (e) {}
  }
  return (
    <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
      <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '5xl' }} lineHeight="110%">
        First time here ? <br />
        <Text as="span" color="blue.400">
          Let's create your first board!
        </Text>
      </Heading>
      <Stack w="100%" align="center" alignSelf="center">
        <Input
          autoFocus
          maxW="70%"
          backgroundColor="gray.600"
          color="white"
          fontWeight="bold"
          placeholder="Enter board name"
          onChange={(event) => setNewBoardName(event.target.value)}
          value={newBoardName}
        />
        <Box align="left" position="relative" w="40%">
          <Text as="span" color="blue.400" fontWeight="bold" alignSelf="left" position="relative">
            Board options:
          </Text>
          <Flex>
            <Box p="4" bg="red.400">
              Board Label
            </Box>
            <Spacer />
            <Box p="4" bg="green.400">
              <Select>
                <option value="option1">Work</option>
                <option value="option2">Home</option>
                <option value="option3">Create new label</option>
              </Select>
            </Box>
          </Flex>
          <Flex>
            <Box p="4" bg="red.400">
              Board color:
            </Box>
            <Spacer />
            <Box p="4" bg="green.400" />
          </Flex>
          <Flex>
            <Box p="4" bg="red.400">
              Lock board
            </Box>
            <Spacer />
            <Box p="4" bg="green.400">
              Box 2
            </Box>
          </Flex>
        </Box>

        <Button
          w="50%"
          borderRadius="md"
          bgGradient="linear(to-r, green.500, green.200, blue.500)"
          _hover={{ bg: 'blue.300' }}
          _active={{
            bg: 'blue.300',
            transform: 'scale(0.98)',
            borderColor: 'blue.300',
          }}
          onClick={(e) => handleBoardCreation()}
        >
          Create Board !
        </Button>
        <Text color="gray.500">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
        </Text>
        <Button variant="link" colorScheme="blue" size="sm">
          Learn more
        </Button>
      </Stack>
    </Stack>
  )
}
