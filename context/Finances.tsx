import React, { createContext } from "react"
import prisma from "../lib/prisma";

export const FinancesContext = createContext({});

export const FinancesProvider = ({ children }: any) => {
  return (
    <FinancesContext.Provider
      value={{ 
        
      }}
    >
      {children}
    </FinancesContext.Provider>
  );
}