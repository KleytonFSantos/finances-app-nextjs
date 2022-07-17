import React, { useState } from "react";
import Grid from "../shared/grid";
import moment from "moment";
import CurrencyInput from "../shared/currencyInput";
import Router from "next/router";
import { CurrencyInputProps } from "./currencyInputProps";

interface FormProps {
  recebidos: string | number;
  gastos: string | number;
}
console.log(Number(15).toFixed(2));
function Form({ recebidos, gastos }: FormProps) {
  const [description, setDescription] = useState<string>("");
  const [incomes, setIncomes] = useState<number>();
  const [expenses, setExpenses] = useState<number>();
  let [date, setDate] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (incomes) {
      try {
        const body = {
          description: description,
          incomes: Number(incomes),
          date: date,
        };
        await fetch(`/api/createIncome`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        await Router.push("/");
      } catch (error) {
        console.log(error);
      }
    } else if (expenses) {
      try {
        const body = {
          description: description,
          expenses: Number(expenses),
          date: date,
        };
        await fetch(`/api/createExpense`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        await Router.push("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Preencha os campos");
    }
   
  }
  const handleOnValueChange: CurrencyInputProps['onValueChange'] = (value, _, values): void => {
    setIncomes(values);

    if (!value) {
      setIncomes('');
      return;
    }
    console.log(incomes.value)
  };

  date = moment(date).format("DD/MM/YYYY");

  return (
    <div className="w-full">
      <div className="w-full lg:flex bg-white shadow rounded grid justify-around p-4 gap-2">
        <div className="flex flex-col">
          <label>Descrição</label>
          <input
            className="outline-none rounded px-3 py-2 border border-zinc-200"
            placeholder="Digite a descrição "
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col">
          <label>Entrada</label>
          <input
            name="incomes"
            className="outline-none rounded px-3 py-2 border border-zinc-200"
            placeholder="0"
            value={incomes}
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIncomes(e.target.value)
            }
          />
        
        </div>
        <div className="flex flex-col">
          <label>Saída</label>
          {/* <input
            className="outline-none rounded px-3 py-2 border border-zinc-200"
            placeholder="0"
            value={expenses}
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setExpenses(e.target.value)
            }
          /> */}
            <CurrencyInput 
          id="validationCustom01"
          name="input-1"
          className="outline-none rounded px-3 py-2 border border-zinc-200"
          value={expenses}
          onValueChange={handleOnValueChange}
          placeholder="0"
          decimalSeparator=","
          prefix="R$"
          step={0.01}
          />
        </div>
        <div className="flex flex-col">
          <label>Data</label>
          <input
            className="outline-none rounded px-3 py-2 border border-zinc-200"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button
          className="px-2 py-1 text-zinc-100 hover:opacity-70 active:opacity-80 border-none h-14 mt-2 rounded cursor-pointer bg-teal-500"
          onClick={submitData}
        >
          ADICIONAR
        </button>
      </div>
      <div className="flex">
        <Grid recebidos={recebidos} gastos={gastos} />
      </div>
    </div>
  );
}

export default Form;
