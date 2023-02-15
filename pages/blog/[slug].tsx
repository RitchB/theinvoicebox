import { Box, Container, VStack } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Head from 'next/head';
import Image from 'next/image';
import { useMemo } from 'react';
import PostMeta from '../../components/blog/PostMeta';
import PageHeader from '../../components/common/PageHeader';
import Layout from '../../components/layout/Layout';
import { mdxComponents } from '../../lib/client/mdx-components';
import { getImageSize, getMdxStaticPaths, getMdxStaticProps } from '../../lib/server/mdx';

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.['slug'] as string;
  const mdxProps = await getMdxStaticProps(context, 'content/blog', slug);

  // get cover image size
  const coverImage = mdxProps?.frontMatter?.coverImage;
  if (coverImage && typeof coverImage === 'string') {
    const coverImageSize = getImageSize(coverImage, 'public');
    mdxProps!.frontMatter.coverImage = {
      width: coverImageSize?.width ?? 1,
      height: coverImageSize?.height ?? 1,
      src: coverImage,
    };
  }

  return !mdxProps
    ? { redirect: { destination: '/blog', permanent: false } }
    : {
        props: {
          ...(await serverSideTranslations(context.locale!, ['common', 'blog'])),
          ...mdxProps,
        },
        revalidate: 10,
      };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: await getMdxStaticPaths(context, 'content/blog'),
    fallback: true,
  };
};

export default function BlogPostPage({
  source,
  frontMatter,
}: {
  source: MDXRemoteSerializeResult;
  frontMatter?: Record<string, any>;
}) {
  const { t } = useTranslation('blog');
  const pageTitle = frontMatter?.title ? `${frontMatter.title} - ${t('blog')}` : t('blog');
  const metaImage = useMemo(() => frontMatter?.coverImage?.src ?? null, [frontMatter]);

  return (
    <>
      {metaImage && (
        <Head>
          <meta property="og:image" content={metaImage} />
          <meta property="twitter:image" content={metaImage} />
        </Head>
      )}
      <Layout pageTitle={pageTitle}>
        <PageHeader title={frontMatter?.title} align="center" containerMaxWidth="3xl">
          <VStack spacing={6} mt={6}>
            {frontMatter?.coverImage && (
              <Box rounded="2xl" overflow="hidden">
                <Image
                  src={frontMatter.coverImage.src}
                  width={frontMatter.coverImage.width}
                  height={frontMatter.coverImage.height}
                  alt={frontMatter?.title}
                  style={{ verticalAlign: 'middle' }}
                />
              </Box>
            )}
            <PostMeta
              authorName={frontMatter?.authorName ?? ''}
              authorImage={frontMatter?.authorImage}
              date={frontMatter?.date}
            />
          </VStack>
        </PageHeader>
        <Box px={4} py={12}>
          <Container maxW="3xl" w="full">
            {source && <MDXRemote components={mdxComponents} {...source} />}
          </Container>
        </Box>
      </Layout>
    </>
  );
}
