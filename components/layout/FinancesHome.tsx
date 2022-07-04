import React, { useState, useEffect } from 'react';
import Header from '../shared/header';
import Resume from '../shared/resume'
import Form from '../shared/form';


function HomeComponent() {
  
  

const data = typeof window !== 'undefined' ? 
localStorage.getItem('transaction') : '';

  const [transactionList, setTransactionList] = useState(
    data ? JSON.parse(data) : [] //se houverem dados, passa para JSON, se não, põe num array vazio
  )
  const [income, setIncome] = useState<string | number>('' || 0);
  const [expense, setExpense] = useState< string | number>('' ||  0);
  const [total, setTotal] = useState < string | number>('' || 0);
  const [loading, setLoading] = useState(true);
  
  
  
  useEffect(() => {
    const amountExpense = transactionList  // amountExpense é um filtro do local storage buscando expense e um map do amount das Expenses
    .filter((item: any) => item.expense)
    .map((transaction: { amount: any; }) => Number(transaction.amount))
    
    const amountIncome = transactionList   // amountIncome é um filtro do local storage buscando coisas diferentes do expense (no caso o income) e um map do amount das Incomes
    .filter((item: { expense: any; }) => !item.expense)
    .map((transaction: { amount: any; }) => Number(transaction.amount))

    const expense = amountExpense.reduce((acc: any, cur: any) => acc + cur, 0).toFixed(2) //soma de todos os amountExpense
   
    const income = amountIncome.reduce((acc: any, cur: any) => acc + cur, 0).toFixed(2)  //soma de todos os income

    const total = Math.abs(income - expense).toFixed(2); //calculo para encontrar o total

    setIncome(`R$ ${income}`);
    setExpense(`R$ ${expense}`);
    setTotal(`${Number(income) < Number(expense) ? "-" : ""} R$ ${total}`);
    setLoading(false);
  }, [transactionList]);

  const handleAdd = (transaction: any) => {
    const newArrayTransaction = [...transactionList, transaction]

    setTransactionList(newArrayTransaction)

    localStorage.setItem('transaction', JSON.stringify(newArrayTransaction))
    setLoading(false);
  }


  if(loading){
    return <div>Carregando...</div>
  }

 


  return (
      <>
    <Header />
    <Resume 
        income = {income as number}
        expense= {expense as number}
        total = {total as number}
    />
    <Form 
        handleAdd= {handleAdd}
        transactionList={transactionList}
        setTransactionList= {setTransactionList}
    />
      </>
  )
}

export default HomeComponent