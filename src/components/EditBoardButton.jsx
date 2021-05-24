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
  Text,
  Input,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { ColorPicker } from './ColorPicker'
import { LabelSelector } from './LabelSelector'

export const EditBoardButton = ({ boardData, updateBoard, setBoards, getBoards }) => {
  const [boardName, setBoardName] = React.useState(boardData.name)
  const [boardLabel, setBoardLabel] = React.useState(boardData.label)
  const [boardColor, setBoardColor] = React.useState(boardData.color)

  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  const handleBoardEdit = async (id, updatedName, updatedLabel, updatedColor) => {
    const updatedBoard = {
      ...boardData,
      name: updatedName,
      label: updatedLabel,
      color: updatedColor,
    }
    await updateBoard(id, updatedBoard)
    const data = await getBoards()
    setBoards(data)

    onClose()
  }
  return (
    <>
      <Tooltip hasArrow label="Delete Board" bg="gray.300" color="black">
        <Box as="Button" onClick={() => setIsOpen(true)}>
          <EditIcon />
        </Box>
      </Tooltip>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Edit Board
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text fontWeight="bold">Board name</Text>
              <Input
                p="2"
                placeholder="Enter board name"
                onChange={(event) => setBoardName(event.target.value)}
                value={boardName}
              />
              <Text fontWeight="bold">Board lavel</Text>
              <LabelSelector p="2" setBoardLabel={setBoardLabel} value={boardLabel} />
              <Text fontWeight="bold">Board color</Text>
              <ColorPicker boardColor={boardColor} setBoardColor={setBoardColor} />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={(e) => handleBoardEdit(boardData.id, boardName, boardLabel, boardColor)}
                ml={3}
              >
                Save changes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
