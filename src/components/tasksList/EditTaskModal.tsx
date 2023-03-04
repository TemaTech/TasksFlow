import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Flex,
  Select,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { Button, IconButton } from "@chakra-ui/button";
import { EditIcon } from '@chakra-ui/icons'
import { useState } from 'react';
import { updateTask } from '../../config/firebase';

interface Props {
  taskName: string;
  taskDescription: string;
  taskPriority: string;
  taskUntilDate: string;
  taskId: string;
  folderId: string;
}

export const EditTaskModal = ({ taskName, taskDescription, taskPriority, taskUntilDate, taskId, folderId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState(taskName);
  const [desc, setDesc] = useState(taskDescription);
  const [priority, setPriority] = useState(taskPriority);
  const [untilDate, setUntilDate] = useState(taskUntilDate);

  const closeModal = () => {
    onClose();
    setName(taskName);
    setDesc(taskDescription);
    setPriority(taskPriority);
    setUntilDate(taskUntilDate);
  }

  return (
    <>
      <IconButton onClick={onOpen} variant='ghost' aria-label="Edit the task" icon={<EditIcon h={4} w={4} />} />

      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex direction='column' gap={3}>
              <FormControl>
                <FormLabel>How would you call this task?</FormLabel>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Any more details about this task?</FormLabel>
                <Textarea value={desc} onChange={e => setDesc(e.target.value)} resize='none' />
              </FormControl>
              <FormControl>
                <FormLabel>How important is this task?</FormLabel>
                <Select value={priority} onChange={e => setPriority(e.target.value)} >
                  <option value='Very important' >Very important</option>
                  <option value='Moderately important' >Moderately important</option>
                  <option value='Not important' >Not important</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>When do you need to complete this task?</FormLabel>
                <Input value={untilDate} onChange={e => setUntilDate(e.target.value)} type='datetime-local' />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='gray' variant='ghost' mr={3} onClick={closeModal}>Cancel</Button>
            <Button colorScheme='green' onClick={() => {
              updateTask(folderId, taskId, "taskName", name);
              updateTask(folderId, taskId, "taskDescription", desc);
              updateTask(folderId, taskId, "taskPriority", priority);
              updateTask(folderId, taskId, "taskUntilDate", untilDate);
              closeModal();
            }}>Save Changes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}