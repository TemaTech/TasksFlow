import { Flex, Heading, Text } from "@chakra-ui/layout";
import { useState } from "react";
import { listenForFolderName, listenForFolderTasks } from "../../config/firebase";
import { NewTaskModal } from './NewTaskModal'
import { ListItem } from './ListItem'

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
    <Flex align='center' justify='center' h='100%' w='100%'>
      <Heading textAlign='center' as='h2' fontSize='md' color='gray.500'>Select a folder in the side menu, or create a new one.</Heading>
    </Flex>
  );
}