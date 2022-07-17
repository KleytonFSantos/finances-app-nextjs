import React, { useState } from "react";
import {
  FaRegArrowAltCircleDown,
  FaRegArrowAltCircleUp,
  FaTrash,
  FaEdit
} from "react-icons/fa";
import Router from "next/router";
import { NextPage } from "next";
import { Incomes } from "../../types";

interface IProps {
  recebidos: Incomes;
  gastos: {
    id: number;
    description: string;
    date: string;
    expenses: number;
  }[];
}

const Grid: NextPage<IProps> = ({ recebidos, gastos }) => {
  const [loading, setLoading] = useState(false);

  console.log(recebidos)

  const handleDeleteExpense = async (id: number) => {
    setLoading(true);
    await fetch(`/api/deleteExpenses/${id}`, {
      method: "DELETE",
    });
    await Router.push("/");
    setLoading(false);
  };

  const handleDeleteIncome = async (id: number) => {
    setLoading(true);
    await fetch(`/api/deleteIncomes/${id}`, {
      method: "DELETE",
    });
    await Router.push("/");
    setLoading(false);
  };
  
  if (loading)
    return (
      <div className="text-center text-red-600 w-full flex mt-8 justify-center items-center">
        Carregando...
      </div>
    );

  return (
    <>
      <div className="container font-sans flex flex-col mx-auto w-[50%] items-center mt-4 justify-start bg-white shadow">
        <ul className="flex flex-col divide divide-y">
          {recebidos?.map((income) => (
            <li key={income.id} className="flex flex-row">
              <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                <div className="flex-1 pl-1 mr-8">
                  <div className="font-medium ">
                    {income.description}
                  </div>
                  <div className="text-gray-600 text-sm mt-2">
                    R$ {income.incomes.toString().replace(/(\d)(\d{2})$/, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g,".")}
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
                  onClick={() => handleDeleteIncome(income.id)}
                  color="black" size={15} />
                </div>
              </div>
            </li> 
          ))}
        </ul>
      </div>
      <div className="container font-sans flex flex-col mx-auto w-[50%] items-center mt-4 justify-start bg-white shadow">
        <ul className="flex flex-col divide divide-y">
          {gastos?.map((expense) => (
            <li key={expense.id} className="flex flex-row">
              <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                <div className="flex-1 pl-1 mr-8">
                  <div className="font-medium ">{expense.description}</div>
                  <div className="text-gray-600 text-sm mt-2">
                    R$ {expense.expenses.toString().replace(/(\d)(\d{2})$/, "$1,$2").replace(/(?=(\d{3})+(\D))\B/g,".")}
                  </div>
                </div>
                <div className="text-gray-600 text-xs mr-3">
                  <FaRegArrowAltCircleDown color="red" size={20} />
                </div>
                <div className="text-gray-600 text-xs">{expense.date}</div>
                <div className="ml-3" title="Deletar saída?">
                  <FaTrash
                    className="ml-2"
                    onClick={() => handleDeleteExpense(expense.id)}
                    color="black"
                    size={15}
                  />
                   
                </div>
                <div className="ml-3" title="Editar saída?">
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
