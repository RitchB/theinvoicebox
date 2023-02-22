import { Box, Container } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

export default function CreateInvoiceHeading() {
    const { t } = useTranslation('app');
    return (
        <Box px={4} py={12}>
            <Container maxW="5xl">
                <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
                    <h3 className="text-lg font-medium leading-6 text-gray-200">Create a new invoice</h3>
                    <div className="mt-3 flex sm:mt-0 sm:ml-4">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Back to Clients
                        </button>
                        <button
                            type="button"
                            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Create New Invoice
                        </button>
                    </div>
                </div>
            </Container>
        </Box>
    );
}
