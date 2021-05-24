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
  Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Tag,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { GithubPicker } from 'react-color'
import { AddIcon, CalendarIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { getBoards, createBoard, removeBoard } from '../utils/api'
import { useFetch } from '../hooks'
import { LabelSelector } from '../components/LabelSelector'
import { DeleteBoardButton } from '../components/DeleteBoardButton'
import { ColorPicker } from '../components/ColorPicker'

const Boards = () => {
  const [boards, setBoards] = React.useState([])
  const [initialPage, setInitialPage] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  // const { boards, initialPage, error, isLoading, setIsLoading, setInitialPage } = useFetch()
  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getBoards()
        setBoards(data)
        if (data.length === 0) {
          setInitialPage(true)
        } else {
          setInitialPage(false)
        }
      }

      fetchData()
    } catch (e) {
      // do nothing
    } finally {
      setIsLoading(false)
    }
  }, [])
  const handleBoardCreation = async (boardName, boardLabel) => {
    const date = new Date()
    await createBoard(
      boardName,
      boardLabel,
      date.toLocaleString('en-US', {
        day: 'numeric', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: 'long', // numeric, 2-digit, long, short, narrow
      })
    )
    const data = await getBoards()
    setBoards(data)
    if (data.length === 0) {
      setInitialPage(true)
    } else {
      setInitialPage(false)
    }
  }
  const InitialLaunch = ({ createBoard }) => {
    const [boardName, setBoardName] = React.useState('')
    const [boardLabel, setBoardLabel] = React.useState('Work')
    const [boardColor, setBoardColor] = React.useState('')
    const handleBoardCreation = (boardName, boardLabel) => {
      const date = new Date()
      try {
        fetch(
          createBoard(
            boardName,
            boardLabel,
            date.toLocaleString('en-US', {
              day: 'numeric', // numeric, 2-digit
              year: 'numeric', // numeric, 2-digit
              month: 'long', // numeric, 2-digit, long, short, narrow
            })
          )
        ).then((result) => {
          setIsLoading(true)
        })
      } catch (e) {}
    }
    return (
      <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '5xl' }}
          lineHeight="110%"
        >
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
            onChange={(event) => setBoardName(event.target.value)}
            value={boardName}
          />
          <Box align="left" position="relative" w="40%">
            <Text as="span" color="blue.400" fontWeight="bold" alignSelf="left" position="relative">
              Board options:
            </Text>
            <Flex>
              <Box p="4">Board Label</Box>
              <Spacer />
              <Box p="4">
                <LabelSelector setBoardLabel={setBoardLabel} />
              </Box>
            </Flex>
            <Flex>
              <Box p="4">Board color:</Box>
              <Spacer />
              <Box p="4" bg="green.400" />
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
            onClick={(e) => createBoard(boardName, boardLabel)}
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
  const NewBoard = ({ createBoard }) => {
    const [boardName, setBoardName] = React.useState('')
    const [boardLabel, setBoardLabel] = React.useState('Work')
    const [boardColor, setBoardColor] = React.useState('')
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    return (
      <>
        <Box as="Button" onClick={() => setIsOpen(true)}>
          <Grid
            display="inline-grid"
            borderRadius="md"
            borderWidth="5px"
            borderColor="blue.200"
            boxShadow="md"
            h="500px"
            w="300px"
            margin="20px"
            textAlign="center"
            _hover={{ bg: 'blue.200' }}
          >
            <Center>
              <VStack>
                <AddIcon size="lg" />
                <Text>Create Board !</Text>
              </VStack>

              <br />
            </Center>
          </Grid>
        </Box>

        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Create new board
              </AlertDialogHeader>

              <AlertDialogBody>
                <Text fontWeight="bold">Board name</Text>
                <Input
                  p="2"
                  placeholder="Enter board name"
                  onChange={(event) => setBoardName(event.target.value)}
                  value={boardName}
                />
                <Text fontWeight="bold">Board lavel</Text>
                <LabelSelector p="2" setBoardLabel={setBoardLabel} />
                <Text fontWeight="bold">Board color</Text>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={(e) => createBoard(boardName, boardLabel)}
                  ml={3}
                >
                  Create
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  const BoardsPreview = () => {
    return (
      <>
        <SimpleGrid display="inline-flex">
          {boards?.map((board) => {
            return (
              <Grid
                key={board.id}
                borderRadius="md"
                boxShadow="md"
                h="500px"
                w="300px"
                margin="20px"
                background="red.400"
                textAlign="center"
              >
                <Flex h="30px" p="1">
                  <Tag variant="solid" colorScheme="teal">
                    {board.label}
                  </Tag>
                  <Spacer />
                  <Box p="2">
                    <DeleteBoardButton
                      boardId={board.id}
                      removeBoard={removeBoard}
                      getBoards={getBoards}
                      setBoards={setBoards}
                      setInitialPage={setInitialPage}
                    />
                  </Box>
                </Flex>

                <Link to={String(board.id)} h="250px">
                  <Heading
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '3xl' }}
                    lineHeight="110%"
                  >
                    {board.name}
                  </Heading>
                  <Text>
                    Stats <br />
                    Created: {board.createdAt}
                  </Text>
                </Link>
              </Grid>
            )
          })}
          <NewBoard createBoard={handleBoardCreation} setBoards={setBoards} />
        </SimpleGrid>
      </>
    )
  }

  return (
    <>
      <Container maxW="6xl">
        {initialPage ? <InitialLaunch createBoard={handleBoardCreation} /> : <BoardsPreview />}
      </Container>
    </>
  )
}

export default Boards
