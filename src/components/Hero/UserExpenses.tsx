/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReportFinance from './Expenses/ReportFinance.tsx';
import EntryInfo from './Expenses/EntryInfo.tsx';
import TableExpenses from './Expenses/TableExpenses.tsx';

const UserExpenses: React.FC = () => {
    const updateData = (newData: any) => {
        console.log(newData);
    };

    return (
        <div className='bg-cyan-400 text-white w-full h-full flex flex-col rounded-xl p-2 font-semibold'>
            <ReportFinance />
            <EntryInfo updateData={updateData} />
            <div className='search w-full flex flex-row items-center justify-center h-12 bg-cyan-700 rounded-xl mb-2'>
                <h1 className='w-20 max-lg-2:w-12'>Filtrar: </h1>
                <input type='search' name='search' id='search' placeholder='filtrar' className='w-80 p-1 rounded-xl text-black max-lg-2:w-40' />
                <button className='ml-5 p-2 w-24 font-semibold bg-cyan-400 rounded-lg hover:bg-cyan-500 hover:cursor-pointer max-lg-2:w-18 max-lg-2:text-sm'>
                    Pesquisar
                </button>
            </div>
            <div className='w-full max-h-[220px] bg-cyan-700 rounded-xl overflow-x-auto'>
                <TableExpenses updateData={updateData} />
            </div>
        </div>
    );
};

export default UserExpenses;
