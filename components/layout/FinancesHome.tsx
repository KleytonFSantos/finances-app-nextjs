import React, { useState, useEffect } from "react";
import Header from "../shared/header";
import Resume from "../shared/resume";
import Form from "../shared/form";

interface IProps {
  recebimentos: number[] | number;
  gastos: number[] | number;
}

function HomeComponent({ recebimentos, gastos }: IProps) {
  const [income, setIncome] = useState<string>();
  const [expense, setExpense] = useState<string>();
  const [total, setTotal] = useState<string | number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const expense = gastos
      .reduce((acc: number, cur: { expenses: number }) => acc + cur.expenses, 0)
      .toFixed(2);
    const income = recebimentos
      .reduce((acc: number, cur: { incomes: number }) => acc + cur.incomes, 0)
      .toFixed(2);

    const total = Math.abs(income - expense).toFixed(2);

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
      <Resume income={income as string} expense={expense as string} total={total as number} />
      <Form recebidos={recebimentos as number} gastos={gastos as number} />
    </>
  );
}

export default HomeComponent;
