import { NextPage } from "next";

interface IProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    lastTransition: string;
}

export const Cards: NextPage<IProps> = ({ title, icon, value, lastTransition}) => {
    return (
        <div className="w-[82%] h-[175px] bg-white mt-[0px] ml-9 snap-center font-poppins flex flex-col rounded-md">
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
                    {lastTransition}
                </small>
            </div>
            
        </div>
    );
}