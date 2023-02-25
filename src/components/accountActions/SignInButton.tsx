import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { SignIn } from "../../config/firebase";

export const SignInButton = () => {
  return (
    <Flex alignItems='center' gap={4}>
      <Button onClick={SignIn} h={10} colorScheme='gray' variant='ghost'>Sign In</Button>
    </Flex>
  );
}