import  { prisma }  from "../lib/prisma";
import type {  NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { Header } from "../components/shared/header";

const Home: NextPage= () => {
  

  return (
    <div>
      <Head>
        <title>Finances-App</title>
      </Head>
      <Header />
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
  console.log(finances)
  return {
    props: {
      finances,
    },
  }
} 

export default Home;
