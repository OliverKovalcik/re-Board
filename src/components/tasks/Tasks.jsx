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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Select,
} from '@chakra-ui/react'
import { CopyIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'
import { useFetch } from '../../hooks'
import {
  getTasks,
  createTask,
  removeTask,
  updateTask,
  getTaskGroups,
  updateTaskGroup,
} from '../../utils/api'

export const Tasks = ({ taskIds, currentListId, reloadComponent, taskGroups }) => {
  const { id } = useParams()
  const { data, reloadPage } = useFetch(getTasks, id)
  const [taskContent, setTaskContent] = React.useState()
  const [taskName, setTaskName] = React.useState()
  const [targetGroupId, setTargetGroupId] = React.useState()
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
  const handleMoveTask = async (taskGroupsArray, taskId, listId) => {
    const taskGroupIds = taskGroupsArray
      .filter((item) => item.id === listId)
      .map((item) => item.taskIds)
    const filteredIds = taskGroupIds[0].filter((idx) => idx !== taskId)
    const newTaskGroupIds = taskGroupsArray.filter((item) => {
      return item.id == targetGroupId
    })
    const test = newTaskGroupIds.map((item) => item.taskIds)
    const add = test[0]
    console.log(add)
    // delete task from taksGroup
    await updateTaskGroup(targetGroupId, { taskIds: [...add, taskId] })
    await updateTaskGroup(listId, { taskIds: filteredIds })

    await reloadPage()
    await reloadComponent()
    onClose()
  }
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()
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
                    <ArrowForwardIcon onClick={() => setIsOpen(true)} />
                    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Move to list:
                          </AlertDialogHeader>
                          <AlertDialogBody>
                            <Select onChange={(event) => setTargetGroupId(event.target.value)}>
                              {taskGroups.map((item) => {
                                return (
                                  <option value={item.id} key={item.id}>
                                    {item.name}
                                  </option>
                                )
                              })}
                            </Select>
                          </AlertDialogBody>
                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                              Cancel
                            </Button>
                            <Button
                              colorScheme="blue"
                              onClick={() => handleMoveTask(taskGroups, tasks.id, currentListId)}
                              ml={3}
                            >
                              Move
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
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
