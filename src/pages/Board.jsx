import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Input, Button, SimpleGrid, Container, Heading } from '@chakra-ui/react'

import { useFetch } from '../hooks'
import { TaskGroups } from '../components/tasks'
import { getTaskGroups, createTaskGroup } from '../utils/api'
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

  // const handleCopyList = (boardId, listId, listName, tasksId) => {
  //   // const tasksData = []

  //   tasksId.forEach(async (taskId) => {
  //     const taskData = await getTask(taskId)
  //     // tasksData.push(taskData)
  //     await createTask(boardId, listId, { name: taskData.name, content: taskData.content })
  //     await updateTaskGroup(listId)
  //   })

  //   reloadPage()
  // }

  return (
    <>
      <Box backgroundColor="blue.900" minW="100vh" h="91.2vh">
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
        <Box background={`url('${bg}') center / cover no-repeat`}>
          <Container maxW="8xl">
            <SimpleGrid display="inline-flex">
              <TaskGroups taskGroups={data} reloadPage={reloadPage} />
            </SimpleGrid>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default Board
