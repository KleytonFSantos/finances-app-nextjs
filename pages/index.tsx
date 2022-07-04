import type { NextPage } from 'next'
import Head from 'next/head'
import FinancesHome from '../components/layout/FinancesHome'
import styles from '../styles/Home.module.css'
import { FcUp } from 'react-icons/fc'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Finances-App</title>
      </Head>
      <FinancesHome />
    </div>
  )
}

export default Home
