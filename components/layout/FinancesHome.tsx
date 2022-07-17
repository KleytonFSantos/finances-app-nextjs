import React, { useState, useEffect } from "react";
import Header from "../shared/header";
import Resume from "../shared/resume";
import Form from "../shared/form";

interface IProps {
  recebimentos: {
    id: number;
    description: string;
    date: string;
    incomes: number;
  }[];
  gastos: {
    id: number;
    description: string;
    date: string;
    expenses: number;
  }[];
}

function HomeComponent({ recebimentos, gastos }: IProps) {
  const [income, setIncome] = useState<string>();
  const [expense, setExpense] = useState<string>();
  const [total, setTotal] = useState<string | number>(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const expense = gastos
      .reduce((acc, cur) => acc + cur.expenses, 0)
    const income = recebimentos
      .reduce((acc: number, cur: { incomes: number }) => acc + cur.incomes, 0)      
    const total = Math.abs(income - expense)

    setIncome(`R$ ${income}`);
    setExpense(`R$ ${expense}`);
    setTotal(`${income < expense ? "-" : ""} R$ ${total}`);
    setLoading(false);
  }, [recebimentos, gastos]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />
      <Resume income={income as string} expense={expense as string} total={total as string} />
      <Form recebidos={recebimentos} gastos={gastos} />
    </>
  );
}

export default HomeComponent;
