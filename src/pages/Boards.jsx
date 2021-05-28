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
  SimpleGrid,
  Grid,
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

import { AddIcon, CalendarIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { getBoards, createBoard, removeBoard, updateBoard, getPrefs } from '../utils/api'
import {
  InitialLaunch,
  EditBoardButton,
  DeleteBoardButton,
  LabelSelector,
} from '../components/boards'
import { ColorPicker } from '../components/common'

const Boards = () => {
  const [boards, setBoards] = React.useState([])
  const [userPref, setUserPref] = React.useState([])
  const [initialPage, setInitialPage] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  // const { boards, initialPage, error, isLoading, setIsLoading, setInitialPage } = useFetch()
  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getBoards()
        const prefs = await getPrefs()
        setUserPref(prefs)
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

  const handleBoardCreation = async (boardName, boardLabel, boardColor) => {
    const date = new Date()
    await createBoard(
      boardName,
      boardLabel,
      boardColor,
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

  const NewBoard = ({ createBoard }) => {
    const [boardName, setBoardName] = React.useState('')
    const [boardLabel, setBoardLabel] = React.useState('Work')
    const [boardColor, setBoardColor] = React.useState('#03a9f4')
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
                <LabelSelector
                  p="2"
                  setBoardLabel={setBoardLabel}
                  boardLabel={boardLabel}
                  userPrefData={userPref}
                />
                <Text fontWeight="bold">Board color</Text>
                <ColorPicker boardColor={boardColor} setBoardColor={setBoardColor} />
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={(e) => createBoard(boardName, boardLabel, boardColor)}
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
                background={board.color}
                textAlign="center"
                overflow="clip"
              >
                <Flex h="30px" p="1">
                  <Tag variant="solid" colorScheme="teal">
                    {board.label}
                  </Tag>
                  <Spacer />
                  <Box p="2">
                    <EditBoardButton
                      userPrefData={userPref}
                      boardData={board}
                      updateBoard={updateBoard}
                      getBoards={getBoards}
                      setBoards={setBoards}
                    />
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
                    Active Lists {board.taskGroups.length}
                    <br />
                    Active Tasks {board.tasks.length}
                    <br />
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
        {initialPage ? (
          <InitialLaunch userPref={userPref} createBoard={handleBoardCreation} />
        ) : (
          <BoardsPreview />
        )}
      </Container>
    </>
  )
}

export default Boards
