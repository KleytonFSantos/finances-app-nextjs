import React from "react";
import {
  FaRegArrowAltCircleDown,
  FaRegArrowAltCircleUp,
  FaTrash,
} from "react-icons/fa";

interface GridProps {
  recebidos: string | number;
  gastos: string | number;
}

function Grid({ recebidos, gastos }: GridProps) {
  const handleDelete = (id) => {
    console.log(id);
  }

  return (
    <>
      <div className="container flex flex-col mx-auto w-[50%] items-center justify-start bg-white dark:bg-gray-800 shadow">
        <ul className="flex flex-col divide divide-y">
          {recebidos?.map((income) => (
            <li key={income.id} className="flex flex-row">
              <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                <div className="flex-1 pl-1 mr-16">
                  <div className="font-medium ">
                    {income.description}
                  </div>
                  <div className="text-gray-600 text-sm">
                    R$ {income.incomes.toFixed(2)}
                  </div>
                </div>
                <div className="text-gray-600 text-xs mr-3">
                  <FaRegArrowAltCircleUp color="green" size={20} />
                </div>
                <div className="text-gray-600 text-xs">
                  {income.date}
                </div>
                <div 
                className="ml-3" 
                title="Deletar Entrada?"
                >
                  <FaTrash 
                  onClick={() => handleDelete(income.id)}
                  color="gray" size={15} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="container flex flex-col mx-auto w-[50%] items-center mt-8 justify-start bg-white  shadow">
        <ul className="flex flex-col divide divide-y">
          {gastos?.map((expense) => (
            <li key={expense.id} className="flex flex-row">
              <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                <div className="flex-1 pl-1 mr-16">
                  <div className="font-medium ">
                    {expense.description}
                  </div>
                  <div className="text-gray-600 text-sm">
                    R$ {expense.expenses.toFixed(2)}
                  </div>
                </div>
                <div className="text-gray-600 text-xs mr-3">
                  <FaRegArrowAltCircleDown 
                  color="red" size={20} />
                </div>
                <div className="text-gray-600 text-xs">
                  {expense.date}
                </div>
                <div className="ml-3" title="Deletar saída?">
                  <FaTrash 
                  onClick={() => handleDelete(expense.id)}
                  color="gray" 
                  size={15} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Grid;
