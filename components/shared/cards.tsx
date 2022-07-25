import { NextPage } from "next";
import { BsArrowUpCircle } from "react-icons/bs"

interface IProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    ultimaTransacao: string;
}

export const Cards: NextPage<IProps> = ({ title, icon, value, ultimaTransacao}) => {
    return (
        <div className="w-4/5 h-[175px] bg-white ml-9 mt-[-90px] font-poppins flex flex-col rounded-md">
            <div className="flex flex-row justify-between p-4">
                <h1>
                    {title}
                </h1>
                <span className="mr-8">
                    {icon}
                </span>
            </div>
            <div className="flex flex-col gap-2 justify-start items-start p-6">
                <div className="text-zinc-700 font-bold text-2xl">
                    R$ {value}
                </div>
                <small className="text-zinc-500">
                    {ultimaTransacao}
                </small>
            </div>
            
        </div>
    );
}