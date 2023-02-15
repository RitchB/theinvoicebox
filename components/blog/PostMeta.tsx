import { Avatar, Box, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { FaCalendarAlt } from 'react-icons/fa';

interface Props {
  authorName: string;
  authorImage?: string;
  date: string;
}

export default function PostMeta({ authorName, authorImage, date }: Props) {
  const { t } = useTranslation('blog');

  return (
    <Box>
      <HStack gap={8} lineHeight="short" fontSize="sm">
        <HStack>
          <Avatar name={authorName} src={authorImage} size="sm" />
          <VStack align="start" spacing={0}>
            <Text>{t('writtenBy')}</Text>
            <Text fontWeight="bold" as="span">
              {authorName}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <Icon fontSize="2xl" color="primary.300">
            <FaCalendarAlt />
          </Icon>
          <VStack align="start" spacing={0}>
            <Text>{t('publishedOn')}</Text>
            <Text fontWeight="bold" as="span">
              {date}
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </Box>
  );
}
