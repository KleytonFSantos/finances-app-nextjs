import React, { createContext } from "react"
import prisma from "../lib/prisma";

export const FinancesContext = createContext({});

export const FinancesProvider = ({ children }: any) => {

  async function getStaticProps() {

    let incomes = await prisma.incomes.findMany();
    incomes = JSON.parse(JSON.stringify(incomes));
    let expenses = await prisma.expenses.findMany();
    expenses = JSON.parse(JSON.stringify(expenses));
    console.log(expenses)
    return {
        props: { incomes, 
                expenses }
    }
  }


return (
  <FinancesContext.Provider
    value={{ 
      getStaticProps
    }}
  >
    {children}
  </FinancesContext.Provider>
);
}