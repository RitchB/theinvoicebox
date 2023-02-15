import { Button } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import AccountSection from './AccountSection';

function Password() {
  const { t } = useTranslation('account');

  return (
    <AccountSection title={t('password')}>
      <Button as={Link} href="/auth/reset-password" variant="outline" colorScheme="primary">
        {t('changeMyPassword')} &rarr;
      </Button>
    </AccountSection>
  );
}
export default Password;
