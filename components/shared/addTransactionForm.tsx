import { NextPage } from 'next'
import React from 'react'

interface IProps {
    description: string;
    inputName: string;
    setDescription: (value: string) => void;
    valueTransaction: string;
    setDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
    changeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    clickButton: (e: React.SyntheticEvent) => void;
    title: string;
}

export const AddTransaction: NextPage<IProps> = ({ description, setDescription, changeInput, valueTransaction, clickButton, setDate, title, inputName }) => {
  return (
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
      <label className="font-bold text-gray-600 text-left mb-2">{title}</label>
      <input
        name={inputName}
        className="outline-none rounded px-3 py-2 border border-zinc-200"
        placeholder="0"
        value={valueTransaction}
        type="text"
        onChange={changeInput}
      />
    </div>
    <div className="flex flex-col">
      <label className="font-bold text-gray-600 text-left mb-2">Data</label>
      <input
        className="outline-none rounded px-3 py-2 border border-zinc-200"
        type="date"
        onChange={setDate}
      />
    </div>
    <button
      className="px-6 text-zinc-100 hover:opacity-70 active:opacity-80 font-bold border-none h-14 mt-6 rounded cursor-pointer bg-teal-500"
      onClick={clickButton}
    >
      Inserir
    </button>
  </div>
  )
}

