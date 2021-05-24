import * as React from 'react'
import {
  Button,
  Input,
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'

export const LabelSelector = ({ setBoardLabel, value }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()
  const [newLabel, setNewLabel] = React.useState('')

  return (
    <>
      <Select onChange={(event) => setBoardLabel(event.target.value)} value={value}>
        <option value="Work">Work</option>
        <option value="Home">Home</option>
        <option value="option3" onClick={() => setIsOpen(true)}>
          Create new label
        </option>
      </Select>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Create new board label
            </AlertDialogHeader>

            <AlertDialogBody>
              <Input placeholder="Create label" />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={onClose} ml={3}>
                Create
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
