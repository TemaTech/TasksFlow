import { Avatar } from "@chakra-ui/avatar";
import { Flex, Text } from "@chakra-ui/layout";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useEffect, useState } from "react";

export const ShowProfile = () => {
  const auth = getAuth();

  const [userName, setUserName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserName(user.displayName || '');
        setProfilePhoto(user.photoURL || null);
      } else {
        setUserName('');
        setProfilePhoto(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Flex align='center' gap='3'>
      <Text fontWeight='bold'>{ userName }</Text>
      <Avatar src={ profilePhoto || undefined } h={7} w={7}></Avatar>
    </Flex>
  );
}