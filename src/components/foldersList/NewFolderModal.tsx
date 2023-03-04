import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { AddIcon } from '@chakra-ui/icons';
import { Input } from "@chakra-ui/input";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { addFolder } from "../../config/firebase";

export const NewFolderModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState('');
  const toast = useToast();

  const closeModal = () => {
    onClose();
    setInputValue('');
  }

  return (
    <>
      <Button onClick={onOpen} leftIcon={<AddIcon h={3} w={3} />} borderRadius={10} colorScheme='gray' variant='outline'>New Folder</Button>

      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>How would you want to call your new folder?</FormLabel>
              <Input onChange={e => setInputValue(e.target.value)} value={inputValue} type='text' />
            </FormControl>
          </ModalBody>
          <ModalFooter display='flex' alignItems='center' gap={3}>
            <Button variant='ghost' onClick={closeModal} >Cancel</Button>
            <Button onClick={async () => {
              try {
                await addFolder(inputValue);
                toast({
                  title: `New folder has been created: "${inputValue}"`,
                  description: "We've created a new folder for you.",
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                  position: 'top'
                });
                closeModal();
              } catch(err) {
                console.error("An error occured during folder creation: ", err);
                toast({
                  title: "This folder hasn't been created, try again.",
                  description: "Some problem has occured while we were creating new folder for you, try again.",
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                  position: 'top'
                })
              }
            }} leftIcon={<AddIcon h={3} w={3} />} colorScheme='green'>New Folder</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}