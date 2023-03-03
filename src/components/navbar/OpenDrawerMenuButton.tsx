import React from 'react'

import { HamburgerIcon } from '@chakra-ui/icons'
import { IconButton } from "@chakra-ui/button"
import { useDisclosure } from '@chakra-ui/hooks'

import { DrawerMenu } from '../drawer/DrawerMenu'

interface Props {
  setFolderID: React.Dispatch<React.SetStateAction<string | null>>
}

export const OpenDrawerMenuButton = ({ setFolderID }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton 
        onClick={onOpen}
        ref={btnRef} 
        h={10} w={10} 
        variant='ghost' colorScheme='gray' aria-label='Open the folders menu' 
        icon={<HamburgerIcon />} 
      />
      <DrawerMenu btnRef={btnRef} onClose={onClose} isOpen={isOpen} setFolderID={setFolderID} />
    </>
  );
}