import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import  { prisma }  from "../lib/prisma";
import { useEffect, useState } from "react";
import { Header } from "../components/shared/header";
import { Resume } from "../components/shared/resume";
import { Form } from "../components/shared/form";
import { Expenses, Incomes } from "../types";

interface IProps {
  incomes: Incomes[];
  expenses: Expenses[];
}

const Home: NextPage<IProps> = ({ incomes, expenses }) => {
  const [income, setIncome] = useState<string>();
  const [expense, setExpense] = useState<string>();
  const [total, setTotal] = useState<string | number>(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const expense = expenses.reduce((acc, cur) => acc + cur.expenses, 0);
    const income = incomes.reduce(
      (acc, cur) => acc + cur.incomes,
      0
    );
    const total = Math.abs(income - expense);
    
    setIncome(`R$ ${income}`);
    setExpense(`R$ ${expense}`);
    setTotal(`${income < expense ? "-" : ""} R$ ${total}`);
    setLoading(false);
  }, [incomes, expenses]);
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Head>
        <title>Finances-App</title>
      </Head>
     <Header />
      <Resume
        income={income as string}
        expense={expense as string}
        total={total as string}
      />
     
      <Form recebidos={incomes} gastos={expenses} />    
     </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let incomes = await prisma.incomes.findMany({
    orderBy: {
      date: "asc",
    }
  });
  incomes = JSON.parse(JSON.stringify(incomes));
  let expenses = await prisma.expenses.findMany({
    orderBy: {
      date: "asc",
    }
  });
  expenses = JSON.parse(JSON.stringify(expenses));
    
  return {
    props: { 
      incomes, 
      expenses,
    },
  };
};

export default Home;
