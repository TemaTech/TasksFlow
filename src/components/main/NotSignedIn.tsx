import { Flex, Heading } from "@chakra-ui/layout";
import { SignInButton } from "../SignInButton";

export const NotSignedIn = () => {
  return (
    <Flex justify='center' align='center' direction='column' gap={4}>
      <Heading textAlign='center' as='h2' fontSize='xl' color='gray.500'>You need to sign in first to have access to your tasks.</Heading>
      <SignInButton />
    </Flex>
  );
}