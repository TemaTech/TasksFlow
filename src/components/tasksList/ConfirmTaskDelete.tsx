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
import { deleteTask } from '../../config/firebase';

interface Props {
  folderId: string;
  taskId: string;
  taskName: string | null;
}

export const ConfirmTaskDelete = ({ folderId, taskId, taskName }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton onClick={onOpen} variant='ghost' aria-label="Delete the task" icon={<DeleteIcon h={4} w={4} />} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm task deletion:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure that you want to delete this task: "{ taskName }"?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>Cancel</Button>
            <Button variant='ghost' colorScheme='red' onClick={() => deleteTask(folderId, taskId)}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}