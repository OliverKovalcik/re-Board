import * as React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Center,
  CloseButton,
  Stack,
  Textarea,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
} from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { useFetch } from '../../hooks'
import { getTasks, createTask, removeTask, updateTask } from '../../utils/api'

export const Tasks = ({ taskIds, currentListId, reloadComponent }) => {
  const { id } = useParams()
  const { data, reloadPage } = useFetch(getTasks, id)

  const [taskContent, setTaskContent] = React.useState()
  const [taskName, setTaskName] = React.useState()
  const handleCreateNewTask = async () => {
    await createTask(Number(id), currentListId)
    await reloadPage()
    await reloadComponent()
  }
  const handleRemoveTask = async (boardId, taskID) => {
    removeTask(boardId, taskID)
    await reloadPage()
    await reloadComponent()
  }
  // Update task

  const handleSaveTaskContent = async (taskID, tasks) => {
    const newContent = { content: taskContent }
    await updateTask(taskID, { ...tasks, ...newContent })
  }
  const handleSaveTaskName = async (taskID, tasks) => {
    const newName = { name: taskName }
    await updateTask(taskID, { ...tasks, ...newName })
  }

  return (
    <>
      {taskIds &&
        data
          .filter((tasks) => {
            return taskIds.includes(tasks.id)
          })
          .map((tasks) => {
            return (
              <div key={tasks.id}>
                <Box backgroundColor="whiteAlpha.800" p="2" m="3" borderRadius="10">
                  <Stack direction="row-reverse" m="5px" spacing={5}>
                    <Popover closeOnBlur={false}>
                      <PopoverTrigger>
                        <CloseButton />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverCloseButton />
                        <PopoverHeader>Are you sure ?</PopoverHeader>
                        <PopoverBody>
                          <Button
                            onClick={() => handleRemoveTask(tasks.boardId, tasks.id)}
                            colorScheme="red"
                          >
                            Delete Task
                          </Button>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>

                    <Input
                      variant="unstyled"
                      onBlur={() => handleSaveTaskName(tasks.id, tasks)}
                      onChange={(e) => setTaskName(e.target.value)}
                      placeholder="Title"
                      defaultValue={tasks.name}
                    />
                  </Stack>

                  <Textarea
                    onBlur={() => handleSaveTaskContent(tasks.id, tasks)}
                    onChange={(e) => setTaskContent(e.target.value)}
                    placeholder="Write here"
                    focusBorderColor="pink.400"
                    defaultValue={tasks.content}
                  />
                </Box>
              </div>
            )
          })}
      {/* Tasks */}
      <Center>
        <Button onClick={() => handleCreateNewTask()} size="sm" m="2">
          Add New Task
        </Button>
      </Center>
    </>
  )
}

Tasks.propTypes = {
  taskIds: PropTypes.arrayOf(PropTypes.number),
  currentListId: PropTypes.number,
  reloadComponent: PropTypes.func,
}
