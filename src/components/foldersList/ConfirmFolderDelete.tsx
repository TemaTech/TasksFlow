import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Button,
  Text,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { deleteFolder } from '../../config/firebase';

interface Props {
  folderId: string;
  folderName: string | null;
}

export const ConfirmFolderDelete = ({ folderId, folderName }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton onClick={e => {
        e.stopPropagation();
        onOpen();
      }} variant='ghost' size='sm' aria-label="Delete the folder" icon={<DeleteIcon />} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm folder deletion:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure that you want to delete this folder: "{ folderName }"?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>Cancel</Button>
            <Button variant='ghost' colorScheme='red' onClick={() => deleteFolder(folderId)}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}