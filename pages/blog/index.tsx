import { Box, Container, VStack } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BlogPost from '../../components/blog/BlogPost';
import PageHeader from '../../components/common/PageHeader';
import Layout from '../../components/layout/Layout';
import { getAllMdxEntries, MdxEntry } from '../../lib/server/mdx';

export const getStaticProps: GetStaticProps = async (ctx) => {
  const entries = (await getAllMdxEntries(ctx, 'content/blog'))
    /* Only show posts that have been set to published */
    .filter((entry) => entry.frontMatter?.published)
    /* Sort entries by date descending */
    .sort((a, b) => {
      return b.frontMatter.date > a.frontMatter.date ? 1 : -1;
    });

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ['common', 'blog'])),
      entries,
    },
  };
};

interface Props {
  entries: Array<MdxEntry>;
}

interface Props {
  entries: Array<MdxEntry>;
}

export default function BlogPage({ entries }: Props) {
  const { t } = useTranslation('blog');

  return (
    <Layout pageTitle={t('title')}>
      <PageHeader title={t('title')} description={t('description')} />
      <Box px={4} py={12}>
        <Container maxW="5xl">
          <VStack spacing={4} align="stretch">
            {entries?.map(({ slug, frontMatter: { title, excerpt, coverImage, date } }, i) => (
              <BlogPost key={slug} slug={slug} title={title} excerpt={excerpt} coverImage={coverImage} date={date} />
            ))}
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
}
