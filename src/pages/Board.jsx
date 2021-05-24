import * as React from 'react'
import { useParams } from 'react-router-dom'
import { CloseButton, Box, Input, Button, Center, Grid, VStack, HStack } from '@chakra-ui/react'

import { useFetch } from '../hooks'
import { Tasks } from '../components/Tasks'
import { getTaskGroups, createTaskGroup, removeTaskGroup, updateTaskGroup } from '../utils/api'

const Board = () => {
  const { id } = useParams()
  const [newListName, setNewListName] = React.useState('')

  const [updateListName, setUpdateListName] = React.useState()
  const { data, reloadPage } = useFetch(getTaskGroups, id)

  const handleCreateNewTaskList = () => {
    createTaskGroup(Number(id), newListName).then(() => {
      setNewListName('')
      reloadPage()
    })
  }
  // NEFUNGUJE
  const handleRemoveList = async (currentListId) => {
    console.log(currentListId)
    await removeTaskGroup(currentListId)
    reloadPage()
  }

  const handleChangeListName = (listId) => {
    const updatedListName = { name: updateListName }
    updateTaskGroup(listId, updatedListName)
  }

  return (
    <Box>
      <Center m="5">
        <Input
          w="50"
          variant="outline"
          placeholder="Add New List"
          onChange={(e) => setNewListName(e.target.value)}
          value={newListName}
        />
        <Button size="md" onClick={() => handleCreateNewTaskList()}>
          Create new List
        </Button>
      </Center>

      <Grid templateColumns="repeat(20, 1fr)" templaterows="repeat(1, 1fr)" gap={6}>
        {data &&
          data.map(({ taskIds, id: currentListId, name }) => {
            return (
              <Box key={currentListId} w="250px" maxHeight="770px">
                <Box
                  // color={toggleColor ? 'pink.400' : 'white'}
                  color="white"
                  m="3"
                  borderRadius="10"
                  backgroundColor="blackAlpha.800"
                  height="12vh"
                >
                  <VStack>
                    <HStack marginLeft="183px">
                      {/* Close Button */}
                      <CloseButton onClick={() => handleRemoveList(currentListId)} />
                    </HStack>
                    <Center>
                      <Input
                        marginLeft="1px"
                        defaultValue={name}
                        onBlur={() => handleChangeListName(currentListId)}
                        focusBorderColor="pink.400"
                        variant="flushed"
                        onChange={(e) => setUpdateListName(e.target.value)}
                      />
                    </Center>
                  </VStack>
                </Box>
                <Tasks
                  taskIds={taskIds}
                  currentListId={currentListId}
                  reloadComponent={reloadPage}
                />
              </Box>
            )
          })}
      </Grid>
    </Box>
  )
}

export default Board
