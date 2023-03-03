import { Flex, Spacer, Text } from "@chakra-ui/layout";
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { IconButton } from "@chakra-ui/button";
import { useEffect, useState } from "react";
import { SlideFade } from "@chakra-ui/transition";
import { deleteFolder, updateFolderName } from "../../config/firebase";
import { Input } from "@chakra-ui/input";

interface Props {
  folderName: string;
  id: string;
  setFolderID: React.Dispatch<React.SetStateAction<string | null>>;
  closeDrawer: () => void;
}

export const ListItem = ({ folderName, id, setFolderID, closeDrawer }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(folderName);
  const [inputValue, setInputValue] = useState(folderName);

  useEffect(() => {
    const updateData = async () => {
      try {
        await updateFolderName(id, name);
      } catch(err) {
        console.error("Error during udpateData in '/src/components/foldersList/ListItem.tsx");
      }
    }
    updateData();
  }, [name]);

  return (
    <SlideFade in={true} offsetY='20px'>
      <Flex 
        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => {
          setFolderID(id);
          closeDrawer();
        }}
        transition='box-shadow 250ms ease-in-out' boxShadow={isHovered ? 'lg' : 'sm'} 
        align='center' bg='gray.800' px={4} py={2} borderRadius={10}
        cursor={isHovered ? 'pointer' : 'default'} gap={1}
      >
        {
          isEditing ?
          <Input p={2} value={inputValue} onClick={e => e.stopPropagation()} onChange={e => setInputValue(e.target.value)} />
          :
          <Text>{ name }</Text>
        }
        <Spacer />
        {
          isEditing ?
          <Flex gap={2}>
            <IconButton onClick={e => {
              e.stopPropagation();
              setName(inputValue);
              setIsEditing(false);
            }} size='sm' aria-label='Save the changes' icon={<CheckIcon />} />
            <IconButton onClick={e => {
              e.stopPropagation();
              setInputValue(name);
              setIsEditing(false);
            }} size='sm' aria-label='Cancel editing' icon={<CloseIcon />} />
          </Flex>
          :
          <Flex gap={2}>
            <IconButton onClick={e => {
              e.stopPropagation();
              setIsEditing(true);
            }} size='sm' variant='ghost' aria-label='Edit the folder' icon={<EditIcon color='orange.200' />} />
            <IconButton onClick={e => {
              e.stopPropagation();
              deleteFolder(id);
            }} size='sm' variant='ghost' aria-label='Delete the folder' icon={<DeleteIcon color='red.400' />} />
          </Flex>
        }
      </Flex>
    </SlideFade>
  );
}