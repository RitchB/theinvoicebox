import { AspectRatio, Box, Button, Heading, Link, SimpleGrid, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import NextLink from 'next/link';
import { useMemo } from 'react';

export type BlogPostData = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  coverImage?: string;
};

export default function BlogPost({ slug, title, date, excerpt, coverImage }: BlogPostData) {
  const { t } = useTranslation('blog');

  const link = useMemo(() => `/blog/${slug}`, [slug]);

  return (
    <Box bg={useColorModeValue('white', 'gray.700')} rounded="3xl" overflow="hidden" p={4}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} alignItems="center" gap={8}>
        {/* Cover image */}
        {coverImage && (
          <AspectRatio ratio={1.6 / 1}>
            <Box as={NextLink} href={link} position="relative" rounded="xl" overflow="hidden">
              <Image src={coverImage} alt={title} layout="fill" objectFit="cover" />
            </Box>
          </AspectRatio>
        )}

        <Box>
          <VStack spacing={4} align="start">
            <VStack spacing={1} align="start">
              {/* Date */}
              <Text fontSize="sm" color="primary.300" textTransform="uppercase" fontWeight="bold">
                {date}
              </Text>
              {/* Title */}
              <Heading fontSize="2xl">
                <Link as={NextLink} href={link} textDecoration="none" _hover={{ color: 'primary.600' }}>
                  {title}
                </Link>
              </Heading>
            </VStack>

            {/* Excerpt */}
            <Text w="full">{excerpt}</Text>

            {/* Read more link */}
            <Button as={NextLink} href={link} variant="outline" colorScheme="primary">
              {t('readMore')} &rarr;
            </Button>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
