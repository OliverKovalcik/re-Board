import React, { useState } from 'react'
import { CirclePicker } from 'react-color'
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Center,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'

export const ColorPicker = ({ boardColor, setBoardColor }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box as="Button" backgroundColor={boardColor} borderRadius="full" h="30px" w="30px" />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Center>
            <CirclePicker onChange={(color, e) => setBoardColor(color.hex)} />
          </Center>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
