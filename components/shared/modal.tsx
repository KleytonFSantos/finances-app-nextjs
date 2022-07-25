import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import { currencyMask } from "../../utils/mask";
import React, { Fragment, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowUpCircle } from "react-icons/bs";
import { BsArrowDownCircle } from "react-icons/bs";
import { Loader } from "./loader";
import Router from "next/router";

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({ value: "" });
  let [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  date = moment(date).format("DD/MM/YYYY");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleCategoryIncome = () => {
    setCategory("income");
    setValue({ value: "" });
  }
  
  const handleCategoryExpense = () => {
    setCategory("expense");
    setValue({ value: "" });
  }
  const submitData = async (e:React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
        const body = {
          description: description,
          value: Number(value.value.replace(/\D/g, "")),
          category: category,  
          date: date,
        };

        await fetch(`/api/createTransaction`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        await Router.push("/");
        setDescription("");
        setLoading(false);
        closeModal();
      } catch (error) {
        console.log(error);
      }
    }


  if (loading) {
    return (
    <div className="fixed inset-0 mt-52 bg-opacity-25">
        <Loader />
    </div>
    );
  }

  return (
    <>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Nova Transação
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="inset-0 overflow-y-auto font-poppins">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-t-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                  <Dialog.Title
                    as="h3"
                    className="text-base font-medium leading-6 flex justify-around text-gray-900"
                  >
                    Cadastrar Transação
                    <div className="ml-32">
                        <AiOutlineClose size={20}
                        onClick={closeModal}
                        />
                    </div>
                  </Dialog.Title>
                 
                  <div className="mt-6">
                    <div className="mb-4">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDescription(e.target.value)
                          }
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="value"
                        value={value.value}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="text"
                        placeholder="valor"
                        onChange={(e) => handleChange(currencyMask(e))}
                      />
                    </div>
                    <div className="mt-2 gap-2 flex justify-around">
                        <button
                        type="button"
                        className="inline-flex justify-center items-center gap-2 rounded-md border border-zinc-300 bg-zinc-100 w-40 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus:bg-zinc-300"
                        onClick={handleCategoryIncome}
                        >
                        <span><BsArrowUpCircle color='green' size={15}/></span>     
                      Entrada
                        </button>
                        <button
                        type="button"
                        className="inline-flex gap-2 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 px-4 w-40 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus:bg-zinc-300"
                        onClick={handleCategoryExpense}
                        >
                        <span><BsArrowDownCircle color='red' size={15}/></span>     
                      Saída
                    </button>
                  </div>
                  <div className="mt-4">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        placeholder="Date"
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      onClick={submitData}
                    >
                      Cadastrar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
