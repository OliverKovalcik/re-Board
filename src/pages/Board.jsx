import * as React from 'react'
import { useParams } from 'react-router-dom'
import {
  CloseButton,
  Box,
  Input,
  ButtonGroup,
  Button,
  Center,
  SimpleGrid,
  Grid,
  VStack,
  HStack,
  Container,
  Heading,
  Text,
  Flex,
  Tag,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import {
  AddIcon,
  CalendarIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  SettingsIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons'
import { useFetch } from '../hooks'
import { TaskGroups } from '../components/tasks'
import { getTask, createTask, getTaskGroups, createTaskGroup, updateTaskGroup } from '../utils/api'
import bg from '../media/board_BG.jpg'

const Board = () => {
  const { id } = useParams()
  const [newListName, setNewListName] = React.useState('')

  const { data, reloadPage } = useFetch(getTaskGroups, id)

  const handleCreateNewTaskList = () => {
    createTaskGroup(Number(id), newListName).then(() => {
      setNewListName('')
      reloadPage()
    })
  }

  const handleCopyList = (boardId, listId, listName, tasksId) => {
    // const tasksData = []

    tasksId.forEach(async (taskId) => {
      const taskData = await getTask(taskId)
      // tasksData.push(taskData)
      await createTask(boardId, listId, { name: taskData.name, content: taskData.content })
      await updateTaskGroup(listId)
    })

    reloadPage()
  }

  return (
    <>
      <Heading align="center" backgroundColor="blue.200">
        <Input
          w="50"
          m="3"
          backgroundColor="gray.600"
          color="white"
          fontWeight="bold"
          variant="filled"
          placeholder="Enter list name"
          onChange={(e) => setNewListName(e.target.value)}
          value={newListName}
        />
        <Button size="md" m="3" onClick={() => handleCreateNewTaskList()}>
          Create new List
        </Button>
      </Heading>
      <Box background={`url('${bg}') center / cover no-repeat`} h="100vh">
        <Container maxW="8xl">
          <SimpleGrid display="inline-flex">
            <TaskGroups taskGroups={data} reloadPage={reloadPage} />
          </SimpleGrid>
        </Container>
      </Box>
    </>
  )
}

export default Board
