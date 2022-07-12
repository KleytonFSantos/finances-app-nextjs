import React from 'react'
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp, FaTrash } from 'react-icons/fa';

interface GridProps {
    recebidos: string | number;
    gastos: string | number;
}

function Grid({ recebidos, gastos,  }: GridProps) {
  
return (
<>
<div className="container flex flex-col mx-auto w-[50%] items-center justify-start bg-white dark:bg-gray-800 shadow">
    <ul className="flex flex-col divide divide-y">
    {recebidos?.map((income) =>(
        <li key={income.id}className="flex flex-row">
            <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                
                <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium dark:text-white">
                        {income.description}
                    </div>
                    <div className="text-gray-600 dark:text-gray-200 text-sm">
                       R$ {income.incomes.toFixed(2)}
                    </div>
                </div>
                <div className="text-gray-600 dark:text-gray-200 text-xs mr-3">
                    <FaRegArrowAltCircleUp color="green" size={20}/>
                </div>
                <div className="text-gray-600 dark:text-gray-200 text-xs">
                    {income.date}
                </div>
            </div>
        </li>
          ))}
    </ul>
</div>
<div className="container flex flex-col mx-auto w-[50%] items-center justify-start bg-white dark:bg-gray-800 shadow">
    <ul className="flex flex-col divide divide-y">
         {gastos?.map((expense) =>(
        <li key={expense.id}className="flex flex-row">
            <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                
                <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium dark:text-white">
                        {expense.description}
                    </div>
                    <div className="text-gray-600 dark:text-gray-200 text-sm">
                      R$  {expense.expenses.toFixed(2)}
                    </div>
                </div>
                <div className="text-gray-600 dark:text-gray-200 text-xs mr-3">
                    <FaRegArrowAltCircleDown color="red" size={20} />
                </div>
                <div className="text-gray-600 dark:text-gray-200 text-xs">
                    {expense.date}
                </div>
            </div>
        </li>
          ))}
           </ul> 

</div>
</>
    )
}

export default Grid