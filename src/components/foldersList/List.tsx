import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import { listenForFolders } from "../../config/firebase";
import { ListItem } from "./ListItem";
import { AddIcon } from '@chakra-ui/icons'
import { NewFolderModal } from './NewFolderModal';

interface Props {
  setFolderID: React.Dispatch<React.SetStateAction<string | null>>;
  closeDrawer: () => void;
}

interface Folders {
  id: string;
  folderName: string;
}

export const List = ({ setFolderID, closeDrawer }: Props) => {
  const [folders, setFolders] = useState<Folders[] | null>(null)

  listenForFolders(setFolders);

  return (
    <Flex direction='column' gap={4}>
      <NewFolderModal />
      {
        folders && folders.map(folder => (
          <ListItem closeDrawer={closeDrawer} key={folder.id} folderName={folder.folderName} id={folder.id} setFolderID={setFolderID} />
        ))
      }
    </Flex>
  );
}
