import { useContext } from 'react';
import { FinancesContext } from '../context/Finances';

const useFinancesContext = () => {
  
  const context = useContext(FinancesContext);

  return context;
}

export default useFinancesContext;
