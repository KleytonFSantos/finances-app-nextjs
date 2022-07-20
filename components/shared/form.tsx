import React, { useState } from "react";
import { PopoverAdd } from "./popover";
import { Grid } from "../shared/grid";
import { Loader } from "../shared/loader";
import { AddTransaction } from "./addTransactionForm";
import moment from "moment";
import Router from "next/router";
import { currencyMask } from "../../utils/mask";
import { NextPage } from "next";
import { Expenses, Incomes } from "../../types";
import { Transition } from "@headlessui/react";

interface IProps {
  recebidos: Incomes[];
  gastos: Expenses[];
}

export const Form: NextPage<IProps> = ({ recebidos, gastos }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [addIncome, setAddIncome] = useState(false);
  const [addExpense, setAddExpense] = useState(false);
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
        setAddExpense(false);
        setAddIncome(false);
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
        setAddExpense(false);
        setAddIncome(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Preencha os campos");
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <PopoverAdd
        addExpenseSwitch={() => {
          setAddExpense(true), setAddIncome(false);
        }}
        addIncomeSwitch={() => {
          setAddIncome(true), setAddExpense(false);
        }}
      />
      {addIncome ? (
        <AddTransaction
          inputName="incomes"
          clickButton={submitData}
          title="Entrada"
          description={description}
          setDescription={setDescription}
          setDate={(e) => setDate(e.target.value)}
          valueTransaction={value.incomes}
          changeInput={(e) => handleChange(currencyMask(e))}
        />
      ) : null}
      {addExpense ? (
        <AddTransaction
          inputName="expenses"
          clickButton={submitData}
          description={description}
          title="Saída"
          setDescription={setDescription}
          setDate={(e) => setDate(e.target.value)}
          valueTransaction={value.expenses}
          changeInput={(e) => handleChange(currencyMask(e))}
        />
      ) : null}
      <div className="lg:flex">
        <Grid recebidos={recebidos} gastos={gastos} />
      </div>
    </div>
  );
};
