import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { AddIcon } from '@chakra-ui/icons';
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { addTask } from "../../config/firebase";

interface Props {
  folderID: string | null;
}

export const NewTaskModal = ({ folderID }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Moderately important');
  const [taskUntilDate, setTaskUntilDate] = useState('');

  const closeModal = () => {
    onClose();
    setTaskName('');
    setTaskDescription('');
    setTaskPriority('Moderately important');
    setTaskUntilDate('');
  }

  const toast = useToast();

  return (
    <>
      <Button onClick={onOpen} colorScheme='green' variant='outline' leftIcon={<AddIcon h={3} w={3} />}>New Task</Button>

      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' gap={3}>
              <FormControl>
                <FormLabel>How would you call this task?</FormLabel>
                <Input value={taskName} onChange={e => setTaskName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Any more details about this task?</FormLabel>
                <Textarea value={taskDescription} onChange={e => setTaskDescription(e.target.value)} resize='none' />
              </FormControl>
              <FormControl>
                <FormLabel>How important is this task?</FormLabel>
                <Select value={taskPriority} onChange={e => setTaskPriority(e.target.value)} >
                  <option value='Very important' >Very important</option>
                  <option value='Moderately important' >Moderately important</option>
                  <option value='Not important' >Not important</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>When do you need to complete this task?</FormLabel>
                <Input value={taskUntilDate} onChange={e => setTaskUntilDate(e.target.value)} type='datetime-local' />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter display='flex' alignItems='center' gap={3}>
            <Button variant='ghost' onClick={closeModal} >Cancel</Button>
            <Button leftIcon={<AddIcon h={3} w={3} />} colorScheme='green' onClick={async () => {
              try {
                if (folderID) {
                  const newTask = {
                    taskName: taskName,
                    taskDescription: taskDescription,
                    taskPriority: taskPriority,
                    taskUntilDate: taskUntilDate,
                    isDone: false
                  }
                  await addTask(folderID, newTask);
                  toast({
                    title: `New task has been created: "${taskName}"`,
                    description: "We've created a new task for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                  });
                  closeModal();
                }
              } catch(err) {
                console.error("An error occured during task creation: ", err);
                toast({
                  title: "This task hasn't been created, try again.",
                  description: "Some problem has occured while we were creating new task for you, try again.",
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                  position: 'top'
                })
              }
            }}>New Task</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}