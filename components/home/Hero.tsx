import { Button, Flex, Heading, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function Hero() {
  const { t } = useTranslation('home');

  const user = useUser();
  return (
    <Flex
      direction="column"
      textAlign="center"
      bg={useColorModeValue('primary.50', 'gray.900')}
      px={8}
      py={36}
      mt={-20}
      align="center"
      justify="center"
    >
      <VStack spacing={2}>
        <Heading fontSize={{ base: '4xl', lg: '5xl' }}>{t('hero.title')}</Heading>
        <Text fontSize="lg">{t('hero.description')}</Text>
      </VStack>

      <Stack direction={{ base: 'column', md: 'row' }} spacing={3} justify="center" mt={5}>
        <Button as={Link} href={user ? '/app' : '/auth/signup'} size="lg" colorScheme="primary">
          {user ? t('dashboardButton') : t('signupButton')} &rarr;
        </Button>

        <Button
          as="a"
          href="https://supastarter.dev/docs"
          target="_blank"
          size="lg"
          colorScheme="primary"
          variant="outline"
        >
          {t('documentationButton')}
        </Button>
      </Stack>
    </Flex>
  );
}
