import React, { useEffect, useState } from 'react';

interface Entry {
    descricao: string;
    valor: number;
    data: string;
    tipo: 'entrada' | 'saida';
}

const ReportFinance: React.FC = () => {
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        const storedEntries: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]');
        setEntries(storedEntries);
    }, []);

    // Calcula o total de entradas
    const calculateTotalEntradas = () => {
        return entries.reduce((acc, curr) => {
            if (curr.tipo === 'entrada') {
                return acc + curr.valor;
            }
            return acc;
        }, 0);
    };

    // Calcula o total de saídas
    const calculateTotalSaidas = () => {
        return entries.reduce((acc, curr) => {
            if (curr.tipo === 'saida') {
                return acc + curr.valor;
            }
            return acc;
        }, 0);
    };

    // Calcula o total geral
    const calculateTotal = () => {
        return calculateTotalEntradas() - calculateTotalSaidas();
    };

    return (
        <div className='w-full h-36 flex flex-row justify-around items-center'>
            <div className='w-60 h-28 bg-cyan-700 flex flex-col items-center justify-around rounded-xl max-md-2:w-40'>
                <div className='w-full flex flex-row justify-around'>
                    <h1>Entradas</h1>
                    <div>{calculateTotalEntradas()}</div>
                </div>
                <div>Valor</div>
            </div>

            <div className='w-60 h-28 bg-cyan-700 flex flex-col items-center justify-around rounded-xl max-md-2:w-40'>
                <div className='w-full flex flex-row justify-around'>
                    <h1>Saídas</h1>
                    <div>{calculateTotalSaidas()}</div>
                </div>
                <div>Valor</div>
            </div>

            <div className='w-60 h-28 bg-cyan-700 flex flex-col items-center justify-around rounded-xl max-md-2:w-40'>
                <div className='w-full flex flex-row justify-around'>
                    <h1>Total</h1>
                    <div>{calculateTotal()}</div>
                </div>
                <div>Valor</div>
            </div>
        </div>
    );
};

export default ReportFinance;
