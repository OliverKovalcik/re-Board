import * as React from 'react'
import {
  CloseButton,
  Box,
  Input,
  ButtonGroup,
  Button,
  Center,
  SimpleGrid,
  Grid,
  VStack,
  HStack,
  Container,
  Heading,
  Text,
  Flex,
  Tag,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import {
  AddIcon,
  CalendarIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  SettingsIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons'
import { Tasks, TaskGroupOptions } from '.'
import { getBoards, getTask, updateTaskGroup, updateTask } from '../../utils/api'

export const TaskGroups = ({ taskGroups, reloadPage }) => {
  return (
    <>
      {taskGroups &&
        taskGroups.map(({ taskIds, id: currentListId, name, boardId, color }) => {
          return (
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

              <Tasks taskIds={taskIds} currentListId={currentListId} reloadComponent={reloadPage} />
            </Grid>
          )
        })}
    </>
  )
}
