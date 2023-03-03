import { Flex, Heading, Spacer } from "@chakra-ui/layout"
import { OpenDrawerMenuButton } from './OpenDrawerMenuButton'
import { Account } from '../accountActions/Account'

interface Props {
  setFolderID: React.Dispatch<React.SetStateAction<string | null>>
}

export const Navbar = ({ setFolderID }: Props) => {
  return (
    <Flex bg='blackAlpha.400' alignItems='center' p={3}>
      <Flex alignItems='center' gap={3}>
        <OpenDrawerMenuButton setFolderID={setFolderID} />
        <Heading color='gray.100' fontSize='1.3rem'>TasksFlow</Heading>
      </Flex>
      <Spacer />
      <Account />
    </Flex>
  );
}