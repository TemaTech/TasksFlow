import { Flex, Heading, Spacer } from "@chakra-ui/layout"
import { SignInButton } from '../SignInButton'
import { OpenDrawerMenuButton } from './OpenDrawerMenuButton'

export const Navbar = () => {
  return (
    <Flex bg='blackAlpha.400' alignItems='center' p={3}>
      <Flex alignItems='center' gap={3}>
        <OpenDrawerMenuButton />
        <Heading color='gray.100' fontSize='1.3rem'>TasksFlow</Heading>
      </Flex>
      <Spacer />
      <SignInButton />
    </Flex>
  );
}