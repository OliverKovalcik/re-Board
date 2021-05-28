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
import { getBoards, getTask, updateTaskGroup, updateTask, removeTaskGroup } from '../../utils/api'

export const TaskGroupOptions = ({ groupId, tasksIds, groupName, reloadPage }) => {
  const [updateListName, setUpdateListName] = React.useState()

  const MoveToBoardDialog = ({ groupId, tasksIds }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const onOpen = () => setIsOpen(true)
    const cancelRef = React.useRef()
    const [targetBoard, setTargetBoard] = React.useState()
    const [boards, setBoards] = React.useState([])
    const fetchBoards = async () => {
      const data = await getBoards()
      setBoards(data)
    }

    const handleMoveList = async (listId, tasksId, targetBoardId) => {
      updateTaskGroup(listId, { boardId: targetBoardId })
      tasksId.forEach(async (taskId) => {
        const taskData = await getTask(taskId)
        updateTask(taskId, { ...taskData, boardId: targetBoardId })
      })
    }

    return (
      <>
        <Box
          as="button"
          m="3"
          onClick={(e) => {
            onOpen()
            fetchBoards()
          }}
        >
          <ArrowRightIcon w="25px" marginRight="5" />
          Move to board ...
        </Box>
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Move to Board :
              </AlertDialogHeader>

              <AlertDialogBody>
                <Select onChange={(event) => setTargetBoard(event.target.value)}>
                  {boards?.map((board) => {
                    return (
                      <option key={board.id} value={board.id}>
                        {board.name}
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
                  onClick={(e) => {
                    handleMoveList(groupId, tasksIds, targetBoard)
                    onClose()
                  }}
                  ml={3}
                >
                  Move
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  const handleRemoveList = async (currentListId) => {
    await removeTaskGroup(currentListId)
    reloadPage()
  }

  const handleChangeListName = (listId) => {
    const updatedListName = { name: updateListName }
    updateTaskGroup(listId, updatedListName)
  }

  const initialFocusRef = React.useRef()
  return (
    <Popover initialFocusRef={initialFocusRef} placement="bottom" closeOnBlur={false}>
      <PopoverTrigger>
        <SettingsIcon h="20px" />
      </PopoverTrigger>
      <Portal>
        <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
          <PopoverHeader pt={2} fontWeight="bold" border="0" fontSize="15px">
            Manage Your Channels
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Input
              marginLeft="1px"
              defaultValue={groupName}
              onBlur={() => handleChangeListName(groupId)}
              focusBorderColor="pink.400"
              backgroundColor="gray.600"
              color="white"
              fontWeight="bold"
              variant="filled"
              onChange={(e) => setUpdateListName(e.target.value)}
            />
            <MoveToBoardDialog groupId={groupId} tasksIds={tasksIds} />
            Change list color
          </PopoverBody>
          <PopoverFooter
            border="0"
            d="flex"
            alignItems="right"
            justifyContent="space-between"
            pb={4}
          >
            <Button
              colorScheme="red"
              ref={initialFocusRef}
              onClick={(e) => handleRemoveList(groupId)}
            >
              Delete List
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
