import { Box, Container, Flex } from '@chakra-ui/layout';
import { Navbar } from './components/navbar/Navbar'
import { Footer } from './components/Footer'
import { NotSignedIn } from './components/main/NotSignedIn'

export const App = () => {
  return (
    <Flex minH='100vh' direction='column' gap='5'>
      <Navbar />
      <Container display='flex' alignItems='center' justifyContent='center' p='5' maxW='7xl' flexGrow={1}>
        <NotSignedIn />
      </Container>
      <Footer />
    </Flex>
  );
}