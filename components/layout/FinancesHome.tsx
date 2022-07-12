import React, { useState, useEffect } from 'react';
import Header from '../shared/header';
import Resume from '../shared/resume'
import Form from '../shared/form';

interface IProps {
  recebimentos: string;
  gastos: string;
}

function HomeComponent({ recebimentos, gastos }: IProps) {
  
  const [income, setIncome] = useState<string>('');
  const [expense, setExpense] = useState<string>('');
  const [total, setTotal] = useState <number>(0); 
  const [loading, setLoading] = useState(true);
  
  
  
  useEffect(() => {    

    const expense = gastos.reduce((acc: number, cur: { expenses: number; } ) => acc + cur.expenses, 0).toFixed(2); 
    const income = recebimentos.reduce((acc: number, cur: { incomes: number; } ) => acc + cur.incomes, 0).toFixed(2) 
    
    const total = Math.abs(income - expense).toFixed(2);

    setIncome(`R$ ${income}`);
    setExpense(`R$ ${expense}`);
    setTotal(`${income < expense ? "-" : ""} R$ ${total}`);
    setLoading(false);
  }, [recebimentos, gastos]);
  console.log(income)
  console.log(expense)

  if(loading){
    return <div>Carregando...</div>
  }

 


  return (
      <>
    <Header />
    <Resume 
        income = {income }
        expense= {expense }
        total = {total}
    />
    <Form 
        recebidos={recebimentos}
        gastos={gastos}
       />
    
      </>
  )
}

export default HomeComponent