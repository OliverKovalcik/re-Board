/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Center, CloseButton, Stack, Textarea, Input } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

import { createTask, removeTask, updateTask } from '../../utils/api'

export const Tasks = ({ taskIds, currentListId, reloadComponent, provided, boardId, tasks }) => {
  const { id } = useParams()

  const [taskContent, setTaskContent] = React.useState()
  const [taskName, setTaskName] = React.useState()
  const handleCreateNewTask = async () => {
    await createTask(Number(id), currentListId)

    await reloadComponent()
  }
  // eslint-disable-next-line no-shadow
  const handleRemoveTask = async (boardId, taskID) => {
    removeTask(boardId, taskID)

    await reloadComponent()
  }
  // Update task

  // eslint-disable-next-line no-shadow
  const handleSaveTaskContent = async (taskID, tasks) => {
    const newContent = { content: taskContent }
    await updateTask(taskID, { ...tasks, ...newContent })
    await reloadComponent()
  }
  // eslint-disable-next-line no-shadow
  const handleSaveTaskName = async (taskID, tasks) => {
    const newName = { name: taskName }
    await updateTask(taskID, { ...tasks, ...newName })
    await reloadComponent()
  }
  // eslint-disable-next-line no-shadow
  const handleCopyTask = async (boardId, taskGroupId, task) => {
    await createTask(boardId, taskGroupId, { ...task, id: null })

    await reloadComponent()
  }

  const results = []
  let filtered = tasks?.filter((x) => taskIds?.includes(x.id))

  taskIds.forEach((key) => {
    let found = false
    // eslint-disable-next-line func-names
    filtered = filtered.filter(function (item) {
      if (!found && item.id === key) {
        results.push(item)
        found = true
        return false
      }
      return true
    })
  })

  return (
    <>
      {results &&
        results?.map((x, index) => {
          return (
            // eslint-disable-next-line react/jsx-no-comment-textnodes
            <Draggable key={x.id} draggableId={x.id.toString()} index={index}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  backgroundColor="whiteAlpha.800"
                  p="2"
                  m="3"
                  borderRadius="10"
                >
                  <Stack direction="row-reverse" m="5px" spacing={5}>
                    <CloseButton boxSize={4} onClick={() => handleRemoveTask(boardId, x.id)} />
                    <CopyIcon onClick={() => handleCopyTask(x.boardId, currentListId, tasks)} />

                    <Input
                      variant="unstyled"
                      onBlur={() => handleSaveTaskName(x.id, x)}
                      onChange={(e) => setTaskName(e.target.value)}
                      placeholder="Title"
                      defaultValue={results[index].name}
                    />
                  </Stack>
                  <Textarea
                    onBlur={() => handleSaveTaskContent(x.id, x)}
                    onChange={(e) => setTaskContent(e.target.value)}
                    placeholder="Write here"
                    focusBorderColor="pink.400"
                    defaultValue={results[index].content}
                  />
                </Box>
              )}
            </Draggable>
          )
        })}

      {provided.placeholder}
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
