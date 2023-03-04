import { Flex, Heading, Text } from "@chakra-ui/layout";
import { useState } from "react";
import { listenForFolderName, listenForFolderTasks } from "../../config/firebase";
import { NewTaskModal } from './NewTaskModal'
import { ListItem } from './ListItem'
import { NewFolderModal } from "../foldersList/NewFolderModal";

interface Props {
  folderID: string | null
}

export const List = ({ folderID }: Props) => {
  const [folderName, setFolderName] = useState<string | null>(null);
  listenForFolderName(folderID, setFolderName);

  const [folderTasks, setFolderTasks] = useState<string[] | null>(null);
  listenForFolderTasks(folderID, setFolderTasks);

  return folderName ? (
    <Flex width='100%' height='100%' gap={10} direction='column'>
      <Flex gap={2} pb={5} borderBottom='1px solid' borderBottomColor='gray.600' w='100%' direction={['column', 'row']} justifyContent='space-between'>
        <Heading color='gray.500'>{ folderName }</Heading>
        <NewTaskModal folderID={folderID} />
      </Flex>
      <Flex align='center' direction='column' gap={5}>
        {
          (folderTasks && folderID) && folderTasks.length > 0 ?
          folderTasks.map(task => (
            <ListItem key={task} taskId={task} folderId={folderID} />
          ))
          :
          <Heading textAlign='center' as='h2' fontSize='md' color='gray.500'>There are no tasks yet...</Heading>
        }
      </Flex>
    </Flex>
  ) : (
    <Flex align='center' direction='column' justify='center' h='100%' w='100%' gap={5}>
      <Heading textAlign='center' fontSize='lg' color='gray.500'>It seems like you don't have any folders, so you can create one!</Heading>
      <NewFolderModal />
    </Flex>
  );
}