import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import { SignOut } from "../../config/firebase";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

export const SignOutButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} h={10} colorScheme='red' variant='outline'>Sign Out</Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Out</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to sign out?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='red' variant='ghost' onClick={SignOut}>Sign Out</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}