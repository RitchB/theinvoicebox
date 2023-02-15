import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Flex
      as={Link}
      href="/"
      fontSize="2xl"
      color={useColorModeValue('gray.800', 'white')}
      align="center"
      lineHeight={1}
    >
      <Text as="span" fontWeight="bold">
        your
        <Text as="span" color={useColorModeValue('primary.500', 'primary.400')}>
          app
        </Text>
      </Text>
    </Flex>
  );
}
