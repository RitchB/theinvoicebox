import { ChakraBaseProvider, cookieStorageManagerSSR, createLocalStorageManager } from '@chakra-ui/react';
import { Lexend } from '@next/font/google';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { appWithTranslation, SSRConfig } from 'next-i18next';
import { AppProps } from 'next/app';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
// import theme for prismjs to style code blocks
import 'prismjs/themes/prism-tomorrow.min.css';
import { useEffect, useState } from 'react';
import { customTheme, defaultToastOptions } from '../chakra-ui.config';
import ProgressBar from '../components/layout/ProgressBar';
import '../styles/globals.css';

// import lexend font with @next/font
const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
});

// Create a client
const queryClient = new QueryClient();

function App({
  Component,
  pageProps,
}: AppProps<{ cookies?: NextApiRequestCookies; initialSession?: Session | null } & SSRConfig>) {
  const router = useRouter();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const { cookies } = pageProps;
  const colorModeManager =
    typeof cookies === 'string' ? cookieStorageManagerSSR(cookies) : createLocalStorageManager('color-mode');

  // redirect to signin page if user is signed out while being on a protected page
  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT' && (router.asPath.startsWith('/app') || router.asPath.startsWith('/account')))
        router.replace('/auth/signin');
    });

    return () => subscription.unsubscribe();
  }, [supabaseClient.auth, router.asPath]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <style jsx global>{`
        :root {
          --font-lexend: ${lexend.style.fontFamily};
        }
      `}</style>
      <ProgressBar />

      <QueryClientProvider client={queryClient}>
        <ChakraBaseProvider
          theme={customTheme}
          colorModeManager={colorModeManager}
          toastOptions={{
            defaultOptions: defaultToastOptions,
          }}
        >
          <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
            <Component {...pageProps} />
          </SessionContextProvider>
        </ChakraBaseProvider>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(App);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.cookies,
    },
  };
};
