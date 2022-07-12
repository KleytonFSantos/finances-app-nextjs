import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import FinancesHome from '../components/layout/FinancesHome'
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma'


const Home: NextPage<any> = ({ incomes, expenses }) => {
  
  console.log(incomes)
  return (
    <div className={styles.container}>
      <Head>
        <title>Finances-App</title>
      </Head>
      <FinancesHome recebimentos={ incomes } gastos={ expenses }/> 
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  let incomes = await prisma.incomes.findMany();
  incomes = JSON.parse(JSON.stringify(incomes));
  let expenses = await prisma.expenses.findMany();
  expenses = JSON.parse(JSON.stringify(expenses));
  console.log(expenses)
  return {
      props: { incomes, 
              expenses 
            },
            revalidate: 10,
  }
}

export default Home
