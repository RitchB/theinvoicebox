import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Features from '../components/home/Features';
import Hero from '../components/home/Hero';
import Pricing from '../components/home/Pricing';
import Layout from '../components/layout/Layout';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  return {
    props: { ...(await serverSideTranslations(ctx.locale!, ['common', 'home'])) },
  };
};

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <Pricing />
    </Layout>
  );
}
