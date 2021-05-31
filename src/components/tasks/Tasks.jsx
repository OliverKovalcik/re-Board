import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Center, CloseButton, Stack, Textarea, Input } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
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

  const handleSaveTaskContent = async (taskID, tasks, value) => {
    const newContent = { content: value }
    await updateTask(taskID, { ...tasks, ...newContent })
    reloadPage()
  }
  const handleSaveTaskName = async (taskID, tasks, value) => {
    const newName = { name: value }
    await updateTask(taskID, { ...tasks, ...newName })
    reloadPage()
  }
  const handleCopyTask = async (boardId, taskGroupId, task) => {
    await createTask(boardId, taskGroupId, { ...task, id: null })
    await reloadPage()
    await reloadComponent()
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
                <Box backgroundColor="green.200" p="2" m="3" borderRadius="10">
                  <Stack direction="row-reverse" m="5px" spacing={5}>
                    <CloseButton
                      boxSize={4}
                      onClick={() => handleRemoveTask(tasks.boardId, tasks.id)}
                    />
                    <CopyIcon onClick={() => handleCopyTask(tasks.boardId, currentListId, tasks)} />

                    <Input
                      variant="unstyled"
                      onChange={(e) => handleSaveTaskName(tasks.id, tasks, e.target.value)}
                      placeholder="Title"
                      defaultValue={tasks.name}
                    />
                  </Stack>

                  <Textarea
                    onChange={(e) => handleSaveTaskContent(tasks.id, tasks, e.target.value)}
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
          Add Task
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
