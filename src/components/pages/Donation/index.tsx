'use client'

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import { api } from '@/libs/axios';
import { DataGrid } from '@mui/x-data-grid';

dayjs.extend(utc);
dayjs.locale('pt-br');

export default function DonationComponent() {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchDonationsPerMonth = async () => {
            try {
                const { data } = await api.get('/donation/distribution/permonth');

                // Formata o mês para cada entrada de doação
                const formattedData = data.map((donation: { month: string | number | dayjs.Dayjs | Date | null | undefined; }, index: number) => ({
                    id: index, // Adiciona um campo 'id' obrigatório para o DataGrid
                    ...donation,
                    month: dayjs.utc(donation.month).format('MMMM'), // Formata o mês por extenso
                }));

                setDonations(formattedData);
            } catch (error) {
                console.error('Erro ao buscar as doações:', error);
            }
        };

        fetchDonationsPerMonth();
    }, []);

    const columns = [
        { field: 'ongname', headerName: 'ONG', flex: 1 },
        { field: 'month', headerName: 'Mês', flex: 1 },
        { field: 'totaldonations', headerName: 'Total de Doações (R$)', flex: 1 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <h1>Doações por ONG e Mês</h1>
            <DataGrid
                rows={donations}
                columns={columns}
            />
        </div>
    );
}
