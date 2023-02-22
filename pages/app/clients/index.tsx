import { useUser } from '@supabase/auth-helpers-react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return { props: { ...(await serverSideTranslations(locale!, ['common', 'app'])) } };
};

//id = 'b2d68dd2-21a6-4d1d-b46c-699ac47e85e5'

function ClientPage() {
  const { t } = useTranslation('app');
  const user = useUser();

  return (
    <div>
      <h1>cette page ne sert a rien</h1>
    </div>
  );
}

export default ClientPage;
