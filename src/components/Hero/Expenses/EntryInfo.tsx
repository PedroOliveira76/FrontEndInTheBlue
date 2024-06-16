import React, { useState } from 'react';

interface EntryInfoProps {
    updateData: (newData: Entry[]) => void;
}

interface Entry {
    descricao: string;
    valor: number;
    data: string;
    tipo: 'entrada' | 'saida';
}

const EntryInfo: React.FC<EntryInfoProps> = ({ updateData }) => {
    const [formData, setFormData] = useState<Entry>({
        descricao: '',
        valor: 0,
        data: '',
        tipo: 'entrada',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newEntry: Entry = {
            descricao: formData.descricao,
            valor: Number(formData.valor),
            data: formData.data,
            tipo: formData.tipo,
        };

        const entries: Entry[] = JSON.parse(localStorage.getItem('entries') || '[]');
        entries.push(newEntry);
        localStorage.setItem('entries', JSON.stringify(entries));

        updateData(entries);

        setFormData({
            descricao: '',
            valor: 0,
            data: '',
            tipo: 'entrada',
        });
    };

    return (
        <div className='w-full h-14 bg-cyan-700 flex items-center rounded-xl mb-4 max-md-2:h-36'>
            <form className='w-full h-full text-white flex flex-row items-center justify-evenly max-md-2:flex-col' onSubmit={handleSubmit}>
                <div className='flex flex-row items-center justify-around w-[750px] max-lg-2:w-[500px]'>
                    <div className='inputs max-md-2:flex-col max-md-2:flex'>
                        <label htmlFor='descricao'>Descrição: </label>
                        <input
                            type='text'
                            id='descricao'
                            className='rounded-xl p-1 text-black max-lg-2:w-20'
                            name='descricao'
                            value={formData.descricao}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='inputs max-md-2:flex-col max-md-2:flex'>
                        <label htmlFor='valor'>Valor: </label>
                        <input
                            type='number'
                            id='valor'
                            className='rounded-xl p-1 text-black max-lg-2:w-20'
                            name='valor'
                            value={formData.valor}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='inputs max-md-2:flex-col max-md-2:flex'>
                        <label htmlFor='data'>Data: </label>
                        <input
                            type='date'
                            id='data'
                            className='rounded-xl p-1 text-black max-lg-2:w-32'
                            name='data'
                            value={formData.data}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className='flex flex-row items-center'>
                    <div className='flex justify-around w-40'>
                        <label htmlFor='entrada'>Entrada:</label>
                        <input
                            type='radio'
                            name='tipo'
                            id='entrada'
                            value='entrada'
                            checked={formData.tipo === 'entrada'}
                            onChange={handleChange}
                        />
                        <label htmlFor='saida'>Saída:</label>
                        <input
                            type='radio'
                            name='tipo'
                            id='saida'
                            value='saida'
                            checked={formData.tipo === 'saida'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='p-2 bg-cyan-400 rounded-lg hover:bg-cyan-500 hover:cursor-pointer'>
                        <button type='submit'>Enviar</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EntryInfo;
