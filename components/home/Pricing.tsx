import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import SubscriptionTable from '../common/SubscriptionTable';
import SectionHeadline from './SectionHeadline';

function Pricing() {
  const { t } = useTranslation('home');

  return (
    <Box
      as="section"
      id="pricing"
      px={8}
      py={16}
      borderTop="2px solid"
      borderColor={useColorModeValue('gray.100', 'gray.700')}
    >
      <SectionHeadline title={t('pricing.title')} description={t('pricing.description')} />
      <Container maxW="5xl">
        <SubscriptionTable />
      </Container>
    </Box>
  );
}

export default Pricing;
