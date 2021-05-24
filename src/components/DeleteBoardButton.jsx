import * as React from 'react'
import {
  Box,
  Button,
  Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

export const DeleteBoardButton = ({
  boardId,
  removeBoard,
  setBoards,
  getBoards,
  setInitialPage,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  const handleBoardDeletion = async (id) => {
    await removeBoard(id)
    const data = await getBoards()
    setBoards(data)
    if (data.length === 0) {
      setInitialPage(true)
    } else {
      setInitialPage(false)
    }
    onClose()
  }
  return (
    <>
      <Tooltip hasArrow label="Delete Board" bg="gray.300" color="black">
        <Box as="Button" onClick={() => setIsOpen(true)}>
          <DeleteIcon />
        </Box>
      </Tooltip>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Board
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={(e) => handleBoardDeletion(boardId)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
