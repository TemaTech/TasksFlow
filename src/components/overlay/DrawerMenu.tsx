import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react'
import { DrawerAccount } from '../accountActions/DrawerAccount'

interface Props {
  btnRef: React.RefObject<HTMLButtonElement>;
  onClose: () => void;
  isOpen: boolean;
}

export const DrawerMenu = ({ btnRef, onClose, isOpen }: Props) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            
          </DrawerBody>

          <DrawerFooter>
            <DrawerAccount />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}