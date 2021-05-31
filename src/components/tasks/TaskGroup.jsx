import * as React from 'react'
import { Grid, Heading, Text, Flex, Spacer } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { Tasks, TaskGroupOptions } from '.'

export const TaskGroups = ({ taskGroups, reloadPage }) => {
  return (
    <>
      {taskGroups &&
        taskGroups.map(({ taskIds, id: currentListId, name, color }) => {
          return (
            <Grid
              key={currentListId}
              borderRadius="md"
              boxShadow="md"
              w="300px"
              margin="10px"
              background={color}
              textAlign="center"
              minH="15vh"
              maxH="80vh"
              overflowY="auto"
              textTransform="uppercase"
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
              <div>
                <Tasks
                  taskIds={taskIds}
                  currentListId={currentListId}
                  reloadComponent={reloadPage}
                />
              </div>
            </Grid>
          )
        })}
    </>
  )
}

TaskGroups.propTypes = {
  reloadPage: PropTypes.func,
  taskGroups: PropTypes.arrayOf(PropTypes.object),
}
