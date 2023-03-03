import React, { useContext, useEffect, useState } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading
} from '@chakra-ui/react'
import { DrawerAccount } from '../accountActions/DrawerAccount'
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { List } from '../foldersList/List';
import { NewFolderModal } from '../foldersList/NewFolderModal';

interface Props {
  btnRef: React.RefObject<HTMLButtonElement>;
  onClose: () => void;
  isOpen: boolean;
  setFolderID: React.Dispatch<React.SetStateAction<string | null>>
}

export const DrawerMenu = ({ btnRef, onClose, isOpen, setFolderID }: Props) => {
  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      user ? setIsAuthenticated(true) : setIsAuthenticated(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Folders</DrawerHeader>

          <DrawerBody>
            {
              isAuthenticated && <List closeDrawer={onClose} setFolderID={setFolderID} />
            }
          </DrawerBody>

          <DrawerFooter>
            <DrawerAccount />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}