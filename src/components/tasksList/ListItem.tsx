import { ButtonGroup } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Badge, Flex, Heading, Spacer, Text } from "@chakra-ui/layout";
import { useState } from "react";
import { listenForTaskIsDone, listenForTaskProperty, updateTask } from "../../config/firebase";
import { CalendarIcon } from '@chakra-ui/icons'
import moment from 'moment';
import { ConfirmTaskDelete } from './ConfirmTaskDelete'
import { EditTaskModal } from './EditTaskModal'

interface Props {
  folderId: string
  taskId: string;
}

export const ListItem = ({ taskId, folderId }: Props) => {
  const [name, setName] = useState<string | null>(null);
  listenForTaskProperty(folderId, taskId, "taskName", setName);

  const [desc, setDesc] = useState<string | null>(null);
  listenForTaskProperty(folderId, taskId, "taskDescription", setDesc);

  const [priority, setPriority] = useState<string | null>(null);
  listenForTaskProperty(folderId, taskId, "taskPriority", setPriority);

  const [untilDate, setUntilDate] = useState<string | null>(null);
  listenForTaskProperty(folderId, taskId, "taskUntilDate", setUntilDate);

  const [done, setDone] = useState<boolean | null>(null);
  listenForTaskIsDone(folderId, taskId, setDone);

  const formatDate = (string: string) => {
    const date = moment(string);
    return date.format("MMMM D, YYYY, HH:mm");
  }

  return (
    <Flex w='100%' bg='gray.900' borderRadius={10} p={4} direction='column' gap={3}>
      <Flex w='100%'>
        {done !== null &&
          <Checkbox spacing={3} size='lg' isChecked={done} onChange={e => updateTask(folderId, taskId, "isDone", e.target.checked)} colorScheme='green'>
            <Heading color={done ? 'gray.500' : 'gray.100'} size='md'>{ name }</Heading>
          </Checkbox>
        }
        <Spacer />
        <ButtonGroup spacing={1}>
          {
            (name !== null && desc !== null && priority !== null && untilDate !== null) &&
            <EditTaskModal folderId={folderId} taskId={taskId} taskName={name} taskDescription={desc} taskPriority={priority} taskUntilDate={untilDate} />
          }
          <ConfirmTaskDelete folderId={folderId} taskId={taskId} taskName={name} />
        </ButtonGroup>
      </Flex>
      <Flex direction='column' gap={3}>
        <Badge colorScheme={done ? 'gray' : priority == 'Very important' ? 'red' : priority == 'Moderately important' ? 'cyan' : 'green'} w='max-content'>{ priority }</Badge>
        <Text lineHeight='8' color={done ? 'gray.500' : 'gray.300'}>{ desc }</Text>
        {
          untilDate && <Text display='flex' alignItems='center' gap={2} color={done ? 'gray.500' : 'gray.300'}><CalendarIcon />{ formatDate(untilDate) }</Text>
        }
      </Flex>
    </Flex>
  );
}
