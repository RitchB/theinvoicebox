import {
  Box,
  Container,
  Flex,
  Heading,
  ListItem,
  Stack,
  UnorderedList,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { FaCloud, FaEnvelope, FaLanguage, FaPaintBrush, FaSync, FaTools, FaUsersCog } from 'react-icons/fa';
import SectionHeadline from './SectionHeadline';

export default function Features() {
  const { t } = useTranslation('home');
  const itemBorder = useColorModeValue('primary.100', 'gray.700');

  const featureItems = [
    {
      title: t('features.authentication.title'),
      icon: <FaUsersCog />,
      highlights: [
        t('features.authentication.highlights.1'),
        t('features.authentication.highlights.2'),
        t('features.authentication.highlights.3'),
      ],
    },
    {
      title: t('features.i18n.title'),
      icon: <FaLanguage />,
      highlights: [t('features.i18n.highlights.1'), t('features.i18n.highlights.2'), t('features.i18n.highlights.3')],
    },
    {
      title: t('features.dataFetching.title'),
      icon: <FaSync />,
      highlights: [t('features.dataFetching.highlights.1'), t('features.dataFetching.highlights.2')],
    },
    {
      title: t('features.mailTemplates.title'),
      icon: <FaEnvelope />,
      highlights: [t('features.mailTemplates.highlights.1'), t('features.mailTemplates.highlights.2')],
    },
    {
      title: t('features.dx.title'),
      icon: <FaTools />,
      highlights: [t('features.dx.highlights.1'), t('features.dx.highlights.2'), t('features.dx.highlights.3')],
    },
    {
      title: t('features.customization.title'),
      icon: <FaPaintBrush />,
      highlights: [
        t('features.customization.highlights.1'),
        t('features.customization.highlights.2'),
        t('features.customization.highlights.3'),
      ],
    },
    {
      title: t('features.serverless.title'),
      icon: <FaCloud />,
      highlights: [t('features.serverless.highlights.1'), t('features.serverless.highlights.2')],
    },
  ];

  return (
    <Box as="section" id="features" px={8} py={16}>
      <SectionHeadline title={t('features.title')} description={t('features.description')} />
      <Container maxW="3xl">
        <VStack spacing={4}>
          {featureItems.map((item, i) => (
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={6}
              key={i}
              w="full"
              p={8}
              border="2px solid"
              borderColor={itemBorder}
              rounded="3xl"
            >
              <Flex
                align="start"
                justify="center"
                fontSize="5xl"
                color="primary.500"
                w={20}
                rounded="3xl"
                flexShrink={0}
              >
                {item.icon}
              </Flex>
              <Box flex={1}>
                <Heading fontSize="xl" mb={2}>
                  {item.title}
                </Heading>
                <UnorderedList opacity={0.5} spacing={1}>
                  {item.highlights.map((highlight, k) => (
                    <ListItem key={k}>{highlight}</ListItem>
                  ))}
                </UnorderedList>
              </Box>
            </Stack>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}
