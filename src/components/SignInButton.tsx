import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";

export const SignInButton = () => {
  return (
    <Flex alignItems='center' gap={4}>
      <Button h={10} colorScheme='gray' variant='ghost'>Sign In</Button>
    </Flex>
  );
}