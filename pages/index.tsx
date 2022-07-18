import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import FinancesHome from "../components/layout/FinancesHome";
import styles from "../styles/Home.module.css";
import  { prisma }  from "../lib/prisma";

const Home: NextPage<any> = ({ incomes, expenses }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Finances-App</title>
      </Head>
      <FinancesHome recebimentos={incomes} gastos={expenses} />
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
    props: { incomes, expenses },
  };
};

export default Home;
