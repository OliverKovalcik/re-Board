import * as React from 'react'
import { Grid, Heading, Text, Flex, Spacer } from '@chakra-ui/react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { Tasks, TaskGroupOptions } from '.'
import { updateTaskGroup } from '../../utils/api'

export const TaskGroups = ({ taskGroups, reloadPage, setTaskGroups, tasks, data }) => {
  const handleDragEnd = (result) => {
    const items = Array.from(taskGroups)
    const { source, destination } = result
    if (!result.destination) return
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = items[source.droppableId - 1]
      const destColumn = items[destination.droppableId - 1]

      // tu sa vyberame uz konkretne array
      const sourceItems = [...sourceColumn.taskIds]
      const destItems = [...destColumn.taskIds]

      // uz len toto dole poriesit
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      const finalSourceChange = { ...items[source.droppableId - 1], taskIds: sourceItems }
      const finalDestinationChange = {
        ...items[destination.droppableId - 1],
        taskIds: destItems,
      }
      items.splice(source.droppableId - 1, 1, finalSourceChange)

      items.splice(destination.droppableId - 1, 1, finalDestinationChange)

      const newSomething = { ...data, taskGroups: items }

      updateTaskGroup(source.droppableId, { taskIds: sourceItems })
      updateTaskGroup(destination.droppableId, { taskIds: destItems })

      setTaskGroups(newSomething)
    } else {
      const column = items[Number(source.droppableId) - 1]
      const copiedItems = [...column.taskIds]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      const newOrderOfArray = { ...column, taskIds: copiedItems }
      items.splice(Number(source.droppableId) - 1, 1, newOrderOfArray)
      const newSomething = { ...data, taskGroups: items }
      updateTaskGroup(source.droppableId, { taskIds: copiedItems })
      setTaskGroups(newSomething)
    }
  }
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        {taskGroups &&
          taskGroups.map(({ taskIds, id: currentListId, name, boardId, color }) => {
            return (
              <Droppable key={currentListId} droppableId={currentListId.toString()}>
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    <Grid
                      key={currentListId}
                      borderRadius="md"
                      boxShadow="md"
                      w="300px"
                      margin="10px"
                      background={color}
                      textAlign="center"
                      overflow="clip"
                    >
                      <Heading m="2">
                        <Flex h="10px" p="2">
                          <Spacer />
                          <TaskGroupOptions
                            groupId={currentListId}
                            tasksIds={taskIds}
                            groupName={name}
                            reloadPage={reloadPage}
                            activeGroupColor={color}
                          />
                        </Flex>
                        <Text
                          fontWeight={600}
                          fontSize={{ base: '2xl', sm: '4xl', md: '3xl' }}
                          lineHeight="110%"
                        >
                          {name}
                        </Text>
                      </Heading>

                      <Tasks
                        tasks={tasks}
                        provided={provided}
                        setTaskGroups={setTaskGroups}
                        data={data}
                        taskIds={taskIds}
                        currentListId={currentListId}
                        reloadComponent={reloadPage}
                        boardId={boardId}
                      />
                    </Grid>
                  </ul>
                )}
              </Droppable>
            )
          })}
      </DragDropContext>
    </>
  )
}
