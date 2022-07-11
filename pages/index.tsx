import type { NextPage } from 'next'
import Head from 'next/head'
import FinancesHome from '../components/layout/FinancesHome'
import styles from '../styles/Home.module.css'
import { FcUp } from 'react-icons/fc'
import prisma from '../lib/prisma'
import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'

const Home: NextPage<any> = ({ incomes }) => {

  
  console.log(incomes)
  return (
    <div className={styles.container}>
      <Head>
        <title>Finances-App</title>
      </Head>
      <div>
        {incomes.map((income: { id: Key | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; incomes: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; date: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }) => (
          <div key={income.id}>
            <h1>{income.description}</h1>
            <p>{income.incomes}</p>
            <p>{income.date}</p>
          </div>
        ))}
      </div>
      {/* <FinancesHome /> */}
    </div>
  )
}
export async function getStaticProps() {

  let incomes = await prisma.incomes.findMany();

  incomes = JSON.parse(JSON.stringify(incomes));

  console.log(incomes);
  return {
      props: { incomes }
  }
}
export default Home
