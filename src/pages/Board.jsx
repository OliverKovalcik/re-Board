import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Input, Button, SimpleGrid, Container, Heading } from '@chakra-ui/react'
import { useFetch } from '../hooks'
import { TaskGroups } from '../components/tasks'
import { createTaskGroup, getBoard } from '../utils/api'
import bg from '../media/board_BG.jpg'

const Board = () => {
  const { id } = useParams()
  const [newListName, setNewListName] = React.useState('')

  const { data, reloadPage, setData } = useFetch(getBoard, id)

  const handleCreateNewTaskList = () => {
    createTaskGroup(Number(id), newListName).then(() => {
      setNewListName('')
      reloadPage()
    })
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
            <TaskGroups
              data={data}
              taskGroups={data.taskGroups}
              tasks={data.tasks}
              setTaskGroups={setData}
              reloadPage={reloadPage}
            />
          </SimpleGrid>
        </Container>
      </Box>
    </>
  )
}

export default Board
