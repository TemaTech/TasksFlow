import { Flex, Heading } from "@chakra-ui/layout";
import { getAuth } from "@firebase/auth";
import { doc, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db, listenForFolderName } from "../../config/firebase";

interface Props {
  folderID: string | null
}

interface FolderTasks {
  taskName: string;
  taskDescription: string;
  taskPriority: string;
  taskUntilDate: string;
}

export const List = ({ folderID }: Props) => {
  const [folderName, setFolderName] = useState<string | null>(null);
  listenForFolderName(folderID, setFolderName);

  const [folderTasks, setFolderTasks] = useState<FolderTasks[] | null>(null);
  

  return (
    <Flex width='100%' height='100%'>
      <Heading color='gray.500'>{ folderName }</Heading>
    </Flex>
  );
}