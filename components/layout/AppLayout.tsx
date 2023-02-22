import { Box } from '@chakra-ui/react';
import { PropsWithChildren, useMemo } from 'react';
import AppNavBar from './AppNavBar';

export default function Layout({
    pageTitle,
    children,
}: PropsWithChildren<{
    pageTitle?: string;
}>) {
    const title = useMemo(() => `${pageTitle ? `${String(pageTitle)} - ` : ''}supastarter`, [pageTitle]);

    return (
        <>
            <AppNavBar />
            <Box minH="100vh" pt={20}>
                {children}
            </Box>
        </>
    );
}
