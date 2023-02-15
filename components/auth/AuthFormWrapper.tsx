import { Box, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { PropsWithChildren, ReactElement } from 'react';

interface Props {
  title: string;
  description?: string | ReactElement;
}

export default function AuthFormWrapper({ title, description, children }: PropsWithChildren<Props>) {
  const { t } = useTranslation('auth');

  return (
    <VStack spacing={6} align="stretch">
      <Stack spacing={2}>
        <Heading fontSize="4xl">{title}</Heading>
        {description && <Text color="gray.500">{description}</Text>}
      </Stack>
      <Box>{children}</Box>
    </VStack>
  );
}
