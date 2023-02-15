import { Box, Container, Flex, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useMemo } from 'react';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';
import SigninForm from '../../components/auth/SigninForm';
import SignupForm from '../../components/auth/SignupForm';
import ColorModeSwitch from '../../components/common/ColorModeSwitch';
import LanguageSwitch from '../../components/common/LanguageSwitch';
import Logo from '../../components/layout/Logo';
import { redirectPath } from '../../config/auth';
import { Database } from '../../types/supabase';

const authActions = ['signup', 'signin', 'forgot-password', 'reset-password'];

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params, locale } = ctx;
  const action = params?.action as string;

  if (!action || !authActions.includes(action))
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };

  const supabaseClient = createServerSupabaseClient<Database>(ctx);
  const { data: session } = await supabaseClient.auth.getSession();

  const isUserLoggedIn = !!session?.session;

  // if user is not logged in and tries to access reset-password page, redirect to signin page
  if (!isUserLoggedIn && action === 'reset-password')
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };

  // if user is logged in and tries to access any other auth page, redirect to home page
  if (isUserLoggedIn && action !== 'reset-password')
    return {
      redirect: {
        destination: redirectPath,
        permanent: false,
      },
    };

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'auth'])),
      action,
    },
  };
};

export default function AuthPage({ action }: { action: string }) {
  const { t } = useTranslation(['auth', 'common']);

  const actionTitles: Record<string, string> = useMemo(
    () => ({
      signup: t('signup.pageTitle'),
      signin: t('signin.pageTitle'),
      forgotPassword: t('forgotPassword.pageTitle'),
      resetPassword: t('resetPassword.pageTitle'),
    }),
    [t]
  );
  const title = useMemo(() => actionTitles[action as string], [action, actionTitles]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Box bg={useColorModeValue('gray.50', 'gray.900')} w="full">
        <Flex
          align="center"
          justify="center"
          px={6}
          py={12}
          bg={useColorModeValue('white', 'gray.800')}
          maxW={{ base: 'full', lg: '50%' }}
          minH="100vh"
        >
          <Container maxW="lg">
            <VStack align="stretch" spacing={12}>
              <Logo />
              {action === 'signup' && <SignupForm />}
              {action === 'signin' && <SigninForm />}
              {action === 'forgot-password' && <ForgotPasswordForm />}
              {action === 'reset-password' && <ResetPasswordForm />}

              <HStack justify="space-between">
                <HStack>
                  <ColorModeSwitch />
                  <LanguageSwitch />
                </HStack>

                <Text py={1} color="gray.500">
                  © by yourapp. {t('footer.allRightsReserved', { ns: 'common' })}
                </Text>
              </HStack>
            </VStack>
          </Container>
        </Flex>
      </Box>
    </>
  );
}
