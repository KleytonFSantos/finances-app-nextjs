import  { prisma }  from "../lib/prisma";
import type {  NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { Cards } from "../components/shared/cards";
import { Header } from "../components/shared/header";
import { Income } from "../types";
import { BsArrowUpCircle } from "react-icons/bs"
import { formatDistance } from "date-fns"
import ptBR from 'date-fns/locale/pt-BR'


interface IProps {
  incomes: Income[];
}

const Home: NextPage<IProps> = ( { incomes }) => {
  
  const dates = incomes.map(item => item.createdAt)
  const lastDate = dates[dates.length - 1]
  const lastDateFormatted = formatDistance(new Date(lastDate), new Date(), {
    locale: ptBR
  })
  console.log(lastDateFormatted)
  const income = incomes.reduce((acc, curr) => acc + curr.value, 0)
  return (
    <div>
      <Head>
        <title>Finances-App</title>
      </Head>
      <Header />
      <Cards 
      title="Entrada"
      icon={<BsArrowUpCircle size={30} color="green"/>}
      value={income.toString()
        .replace(/(\d)(\d{2})$/, "$1,$2")
        .replace(/(?=(\d{3})+(\D))\B/g, ".")}
      ultimaTransacao={`Última transação a ${lastDateFormatted}`}
      />
     </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {

  let finances = await prisma.finances.findMany({
    orderBy: {
      date: "asc"
    }
  })
  finances = JSON.parse(JSON.stringify(finances))

  let incomes = await prisma.finances.findMany({
    where: {
      category: "income"
    },
    orderBy: {
      date: "asc"
    }
  })
  incomes = JSON.parse(JSON.stringify(incomes))

  console.log(incomes)
  return {
    props: {
      incomes, 
    },
  }
} 

export default Home;
function parseIso(arg0: Date) {
  throw new Error("Function not implemented.");
}

