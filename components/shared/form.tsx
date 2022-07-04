import React, { useState } from 'react';
import Grid from '../shared/grid';
import moment from 'moment';

interface FormProps {
    handleAdd: (item: any) => void;
    transactionList: any[];
    setTransactionList: (item: any[]) => void;
}    

function Form({ handleAdd, transactionList, setTransactionList }: FormProps) {
    const [desc, setDesc] = useState("");
    let [amount, setAmount] = useState<string | number>('');
    let [date, setDate] = useState('');
    const [isExpense, setExpense] = useState(false);
   
    date = moment(date).format("DD/MM/YYYY");     
    
    
    const generateID = () => Math.round(Math.random() * 1000);
  
    const handleSave = () => {
        if (!desc || !amount || date === "Invalid date") {
            alert('Informe a descrição, o valor e a data!');
            return;
        } else if (amount < 1){
            alert('O valor tem que ser positivo!')
            return;
        }

        const transaction = {
            id: generateID(),
            desc: desc,
            amount: amount,
            date: date,
            expense: isExpense,
            
        };

        handleAdd(transaction);

        setDesc("");
        setAmount(0);
        setDate("");
    };
  
    return (
    <div className='w-full'>
        <div className='w-full lg:flex bg-white shadow rounded grid justify-around p-4 gap-2'>
            <div className='flex flex-col'>
            <label>Descrição</label>
            <input className="outline-none rounded px-1 py-2 border border-zinc-200" value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
            <div className='flex flex-col'>
            <label>Valor</label>
            <input 
                className="outline-none rounded px-1 py-2 border border-zinc-200"
                value={amount}
                type="number"
                onChange={(e) => setAmount(e.target.value)}
            />
            </div>
            <div className='flex flex-col'>
            <label>Data</label>
        
            <input
                className="outline-none rounded px-1 py-2 border border-zinc-200"
                type="date"
                onChange={(e) => setDate(e.target.value)}
            />
            </div>
            <div className='flex items-center'>
            <input
                className="outline-none rounded px-1 py-2 border border-zinc-200 ml-5 mr-1 accent-black"
                type="radio"
                id="rIncome"
                defaultChecked
                name="group1"
                onChange={() => setExpense(!isExpense)}
            />
            <label htmlFor="rIncome">Entrada</label>
            <input
                className="outline-none rounded px-1 py-2 border border-zinc-200 ml-5 mr-1 accent-black"            
                type="radio"
                id="rExpenses"
                name="group1"
                onChange={() => setExpense(!isExpense)}
            />
            <label htmlFor="rExpenses">Saída</label>
            </div>
            <button 
            className='px-2 py-1 text-zinc-100 border-none h-14 mt-2 rounded cursor-pointer bg-teal-500'
            onClick={handleSave}>ADICIONAR</button>
        </div>
        <Grid item={transactionList} setItem={setTransactionList}/>
    </div>
    )
}

export default Form