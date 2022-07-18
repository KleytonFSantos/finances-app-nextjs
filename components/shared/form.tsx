import React, { useState } from "react";
import { Grid } from "../shared/grid";
import { Loader } from "../shared/loader";
import moment from "moment";
import Router from "next/router";
import { currencyMask } from "../../utils/mask";
import { NextPage } from "next";
import { Expenses, Incomes } from "../../types";

interface IProps {
  recebidos: Incomes[];
  gastos: Expenses[];
}

export const Form: NextPage<IProps> = ({ recebidos, gastos }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({ incomes: "", expenses: "" });
  let [date, setDate] = useState("");
  date = moment(date).format("DD/MM/YYYY");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const submitData = async (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    if (value.incomes) {
      try {
        const body = {
          description: description,
          incomes: Number(value.incomes.replace(/\D/g, "")),
          date: date,
        };
        await fetch(`/api/createIncome`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        await Router.push("/");
        setDescription("");
        setValue({ incomes: "", expenses: "" });
      } catch (error) {
        console.log(error);
      }
    } else if (value.expenses) {
      try {
        const body = {
          description: description,
          expenses: Number(value.expenses.replace(/\D/g, "")),
          date: date,
        };
        await fetch(`/api/createExpense`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        await Router.push("/");
        setDescription("");
        setValue({ incomes: "", expenses: "" });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Preencha os campos");
    }
    setLoading(false)
  };

  if(loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="w-full">
      <div className="w-full lg:flex bg-white shadow rounded grid justify-around p-4 gap-2">
        <div className="flex flex-col">
          <label className="font-bold text-gray-600 text-left mb-2">Descrição</label>
          <input
            className="outline-none rounded px-3 py-2 border border-zinc-200"
            placeholder="Digite a descrição"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold text-gray-600 text-left mb-2">Entrada</label>
          <input
            name="incomes"
            className="outline-none rounded px-3 py-2 border border-zinc-200"
            placeholder="0"
            value={value.incomes}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(currencyMask(e))
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold text-gray-600 text-left mb-2">Saída</label>
          <input
            className="outline-none rounded px-3 py-2 border border-zinc-200"
            name="expenses"
            placeholder="0"
            value={value.expenses}
            type="text"
            onChange={(e) => handleChange(currencyMask(e))}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold text-gray-600 text-left mb-2">Data</label>
          <input
            className="outline-none rounded px-3 py-2 border border-zinc-200"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button
          className="px-6 text-zinc-100 hover:opacity-70 active:opacity-80 font-bold border-none h-14 mt-6 rounded cursor-pointer bg-teal-500"
          onClick={submitData}
        >
          Inserir
        </button>
      </div>
      <div className="flex">
        <Grid recebidos={recebidos} gastos={gastos} />
      </div>
    </div>
  );
};
