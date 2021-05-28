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
import { updatePrefs } from '../../utils/api'

export const LabelSelector = ({ setBoardLabel, value, userPrefData, boardLabel }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  const [userPref, setUserPref] = React.useState(userPrefData)
  const [newLabel, setNewLabel] = React.useState('')

  const handleLabelCreation = () => {
    const updatedPrefs = {
      ...userPref,
      labels: [...userPref.labels, newLabel],
    }
    updatePrefs(updatedPrefs)
    setUserPref(updatedPrefs)
    setBoardLabel(newLabel)
    onClose()
  }
  return (
    <>
      <Select onChange={(event) => setBoardLabel(event.target.value)} value={boardLabel}>
        {userPref.labels?.map((label) => (
          <option value={label}>{label}</option>
        ))}
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
              <Input
                placeholder="Create label"
                onChange={(event) => setNewLabel(event.target.value)}
                value={newLabel}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={(e) => handleLabelCreation(newLabel)} ml={3}>
                Create
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
