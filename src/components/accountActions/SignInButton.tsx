import { Button } from "@chakra-ui/button";
import { SignIn } from "../../config/firebase";

export const SignInButton = () => {
  return (
    <Button onClick={SignIn} h={10} colorScheme='gray' variant='ghost'>Sign In</Button>
  );
}