import { Container, Flex, Text } from '@chakra-ui/layout';
import { Navbar } from './components/navbar/Navbar'
import { Footer } from './components/Footer'
import { NotSignedIn } from './components/NotSignedIn'
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { List } from './components/tasksList/List';
import { listenForFistFolderId } from './config/firebase';

export const App = () => {
  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [folderID, setFolderID] = useState<string | null>(null);
  const [firstFolderId, setFirstFolderId] = useState<string | null>(null);
  listenForFistFolderId(setFirstFolderId);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      user ? setIsAuthenticated(true) : setIsAuthenticated(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Flex minH='100vh' direction='column' gap='5'>
      <Navbar setFolderID={setFolderID} />
      <Container display='flex' justifyContent='center' p='5' maxW='5xl' flexGrow={1}>
        {
          isAuthenticated ?
            folderID ?
              <List folderID={folderID} />
              :
              <List folderID={firstFolderId} />
            :
            <NotSignedIn />
        }
      </Container>
      <Footer />
    </Flex>
  );
}
