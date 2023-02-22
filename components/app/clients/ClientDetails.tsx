import { Box, Container, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

export default function ClientDetailsSection() {
    const { t } = useTranslation('app');
    return (
        <Box px={4} py={12}>
            <Container maxW="5xl">
                <p>faut je passe children ou je sais pas quoi pour passer les infos du clients qui  viennent du hook qui se font dans l'autre place</p>
                <p>probablement besoin d'un tableau ici pour mettre les infos</p>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>To convert</Th>
                                <Th>into</Th>
                                <Th isNumeric>multiply by</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>inches</Td>
                                <Td>millimetres (mm)</Td>
                                <Td isNumeric>25.4</Td>
                            </Tr>

                        </Tbody>
                    </Table>
                </TableContainer>

            </Container>
        </Box>
    );
}
