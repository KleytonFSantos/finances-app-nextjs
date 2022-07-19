import { Popover, Transition } from '@headlessui/react'
import { NextPage } from 'next';
import { Fragment } from 'react'
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa'

interface IProps {
  addIncomeSwitch: () => void;
  addExpenseSwitch: () => void;
}

export const PopoverAdd: NextPage<IProps> = ({addIncomeSwitch, addExpenseSwitch}) => {
 
  return (
    <div className="flex justify-center w-full px-4 mb-16">
      <Popover className="relative" title="Adicione uma nova transação">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-full bg-green-500 px-4 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none hover:opacity-75 focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-opacity-75 `}
            >
              <span>+</span>
              
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform sm:px-0 lg:max-w-1xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 h- ring-black ring-opacity-5">
                  <div className="relative grid gap-8 p-3 bg-white lg:grid-cols-2">
                      <div
                        onClick={addIncomeSwitch}
                        className="-m-3 flex items-center rounded-lg cursor-pointer p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                            <FaRegArrowAltCircleUp color="green" size={25} />
                        </div>
                        <div className="ml-4">
                          <button 
                          className="text-sm font-medium text-gray-900">
                            Entrada
                          </button>
                        </div>
                      </div>

                      <div
                        onClick={addExpenseSwitch}
                        className="-m-3 flex items-center rounded-lg cursor-pointer p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                            <FaRegArrowAltCircleDown color="red" size={25} />
                        </div>
                        <div className="ml-4">
                          <button
                            className="text-sm font-medium text-gray-900">
                            Despesa
                          </button>
                        </div>
                      </div>
                  </div>
                  
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
