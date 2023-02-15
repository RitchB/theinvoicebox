import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { PropsWithChildren, useMemo } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

export default function Layout({
  pageTitle,
  children,
}: PropsWithChildren<{
  pageTitle?: string;
}>) {
  const title = useMemo(() => `${pageTitle ? `${String(pageTitle)} - ` : ''}supastarter`, [pageTitle]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="This is a SaaS boilerplate built for supabase." />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <NavBar />
      <Box minH="100vh" pt={20}>
        {children}
      </Box>
      <Footer />
    </>
  );
}
