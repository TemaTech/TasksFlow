import { Box, Flex, Link, Text } from "@chakra-ui/layout";

export const Footer = () => {
  return (
    <Flex bg='blackAlpha.400' direction='column' p='3' justify='center' align='center'>
      <Text color='gray.500'>Copyright (c) { new Date().getFullYear() } Chernysh Artem</Text>
      <Flex gap='3'>
        <Link href='https://twitter.com/cherrartem' isExternal color='gray.500'>Twitter</Link>
        <Link href='https://github.com/TemaTech' isExternal color='gray.500'>GitHub</Link>
      </Flex>
    </Flex>
  );
}