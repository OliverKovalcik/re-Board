import * as React from 'react'
import { Box, Heading, Button, Text, Input, Stack, Flex, Spacer } from '@chakra-ui/react'

import { LabelSelector } from '.'
import { ColorPicker } from '../common'

export const InitialLaunch = ({ userPref, createBoard }) => {
  const [boardName, setBoardName] = React.useState('')
  const [boardLabel, setBoardLabel] = React.useState('Work')
  const [boardColor, setBoardColor] = React.useState('#03a9f4')

  return (
    <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
      <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '5xl' }} lineHeight="110%">
        First time here ? <br />
        <Text as="span" color="blue.400">
          Let's create your first board!
        </Text>
      </Heading>
      <Stack w="100%" align="center" alignSelf="center">
        <Input
          autoFocus
          maxW="70%"
          backgroundColor="gray.600"
          color="white"
          fontWeight="bold"
          placeholder="Enter board name"
          onChange={(event) => setBoardName(event.target.value)}
          value={boardName}
        />
        <Box align="left" position="relative" w="40%">
          <Text as="span" color="blue.400" fontWeight="bold" alignSelf="left" position="relative">
            Board options:
          </Text>
          <Flex>
            <Box p="4">Board Label</Box>
            <Spacer />
            <Box p="4">
              <LabelSelector
                setBoardLabel={setBoardLabel}
                boardLabel={boardLabel}
                userPrefData={userPref}
              />
            </Box>
          </Flex>
          <Flex>
            <Box p="4">Board color:</Box>
            <Spacer />
            <Box p="4">
              <ColorPicker boardColor={boardColor} setBoardColor={setBoardColor} />
            </Box>
          </Flex>
        </Box>

        <Button
          w="50%"
          borderRadius="md"
          bgGradient="linear(to-r, green.500, green.200, blue.500)"
          _hover={{ bg: 'blue.300' }}
          _active={{
            bg: 'blue.300',
            transform: 'scale(0.98)',
            borderColor: 'blue.300',
          }}
          onClick={(e) => createBoard(boardName, boardLabel, boardColor)}
        >
          Create Board !
        </Button>
        <Text color="gray.500">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
        </Text>
        <Button variant="link" colorScheme="blue" size="sm">
          Learn more
        </Button>
      </Stack>
    </Stack>
  )
}
