import { Box } from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from "../../../components/layout/Layout";
import { Database } from '../../../types/supabase';
import ClientDetailsSection from '../../../components/app/clients/ClientDetails'
import CreateInvoiceHeading from '../../../components/app/Invoices/CreateInvoiceHeading'

export async function getStaticPaths() {

  {/* 
  // I'll need to run on all possibles clients ids
  const ids = await getAllIds(); // récupère toutes les valeurs d'ID depuis la base de données
  const paths = ids.map(id => ({
    params: { id: id.toString() },
  }));
  return { paths, fallback: 'blocking' }
  Notez que dans cet exemple, la méthode getAllIds doit retourner une liste de valeurs d'ID en tant que tableau. Si votre source de données est différente, vous devrez adapter cette méthode pour récupérer les valeurs d'ID de manière appropriée.
  */}


  return {

    paths: [
      { params: { id: 'b2d68dd2-21a6-4d1d-b46c-699ac47e85e5' } },
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const rrr = context.params?.['id'] as string;
  console.log(rrr)

  const fakedata =
    [{
      id: 'b2d68dd2-21a6-4d1d-b46c-699ac47e85e5',
      name: 'Marie'
    }]

  {/*  const { data: clients, isLoading: loadingClients } = useQuery('clients', async () => {
    const { data: clients, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  });
  */}

  return {
    props: {
      clientDetails: fakedata[0],
    }
  }
}



{/*export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: await getMdxStaticPaths(context, 'content/blog'),
    fallback: true,
  };
};
*/}



export default function ClientDetails({ clientDetails }) {
  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter()
  const clientId = router.query.id as string
  const [thisClient, setThisClient] = useState<null | Client>(null);
  const [thisClientName, setThisClientName] = useState<null | string>(null);


  useEffect(() => {
    console.log('je passe ici')
    console.log('clientId: ', clientId)

    async function fetchClient() {
      const { data, error } = await supabaseClient
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();

      if (error) {
        console.error(error);
        console.log('ya une erreur')
      } else {
        setThisClient(data);
        setThisClientName(data.name)
        console.log('data', data)
      }
    }

    if (clientId) {
      fetchClient();
    }

  }, [clientId]);

  return (

    <Layout>
      <ClientDetailsSection />
      <CreateInvoiceHeading />
      <Box>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p> Here I need :</p>
          <li>1. A section with the client infos</li>
          <li>2. A button to create new invoices</li>
          <li>3. A section with the client already created invoices</li>
          <br />
          <p>Voici le detail du client:</p>
          <p>{clientId}</p>
          {thisClientName}
        </div>
      </Box>
    </Layout>
  )
}