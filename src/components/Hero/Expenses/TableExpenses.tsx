import React, { useEffect, useState } from 'react';

interface TableExpensesProps {
    updateData: (newData: Entry[]) => void;
}

interface Entry {
    descricao: string;
    valor: number;
    data: string;
    tipo: 'entrada' | 'saida';
}

const TableExpenses: React.FC<TableExpensesProps> = ({ updateData }) => {
    const [data, setData] = useState<Entry[]>([]);

    useEffect(() => {
        const storedEntries: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]');
        setData(storedEntries);
    }, []);

    const handleDelete = (index: number) => {
        const updatedData = [...data];
        updatedData.splice(index, 1);
        localStorage.setItem('entries', JSON.stringify(updatedData));
        setData(updatedData);
        updateData(updatedData); // Atualiza o ReportFinance
    };

    return (
        <table className='w-full'>
            <thead>
                <tr className='bg-cyan-700'>
                    <th className='px-4 py-2'>Descrição</th>
                    <th className='px-4 py-2'>Valor</th>
                    <th className='px-4 py-2'>Data</th>
                    <th className='px-4 py-2'>Tipo</th>
                    <th className='px-4 py-2'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td className='bg-cyan-600 px-4 py-2'>{item.descricao}</td>
                        <td className='bg-cyan-600 px-4 py-2'>{item.valor}</td>
                        <td className='bg-cyan-600 px-4 py-2'>{item.data}</td>
                        <td className='bg-cyan-600 px-4 py-2'>{item.tipo}</td>
                        <td className='bg-cyan-600 px-4 py-2'>
                            <button className='bg-red-600 p-2 rounded-xl hover:bg-red-900' onClick={() => handleDelete(index)}>
                                Deletar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableExpenses;
