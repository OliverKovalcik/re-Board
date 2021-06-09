import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Center, CloseButton, Stack, Textarea, Input } from '@chakra-ui/react'
import { Draggable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import { createTask, removeTask, updateTask } from '../../utils/api'

export const Tasks = ({
  taskIds,
  currentListId,
  reloadComponent,
  provided: providedPlaceholder,
  boardId,
  tasks,
}) => {
  const { id } = useParams()
  const [taskContent, setTaskContent] = React.useState()
  const [taskName, setTaskName] = React.useState()

  // create new task
  const handleCreateNewTask = async () => {
    await createTask(Number(id), currentListId)
    await reloadComponent()
  }
  // remove task
  const handleRemoveTask = (idOfBoard, taskID) => {
    removeTask(idOfBoard, taskID)
    reloadComponent()
  }
  // update task content
  const handleSaveTaskContent = (taskID, task) => {
    const newContent = { content: taskContent }
    updateTask(taskID, { ...task, ...newContent })
  }
  // update task name
  const handleSaveTaskName = (taskID, task) => {
    const newName = { name: taskName }
    updateTask(taskID, { ...task, ...newName })
    reloadComponent()
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
            <Draggable key={x.id} draggableId={x.id.toString()} index={index}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  backgroundColor="green.200"
                  p="2"
                  m="3"
                  borderRadius="10"
                >
                  <Stack direction="row-reverse" m="5px" spacing={5}>
                    <CloseButton boxSize={4} onClick={() => handleRemoveTask(boardId, x.id)} />

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
      {providedPlaceholder.placeholder}
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
  provided: PropTypes.objectOf(),
  boardId: PropTypes.number,
  tasks: PropTypes.objectOf(),
}
