import { NextPage } from "next";
import React from "react";

interface IProps {
  styles: string;
  title: string;
  titleStyles: string;
  Icon: any;
  value: string | number;
}

export const Card: NextPage<IProps> = ({ title, value, Icon, styles, titleStyles }) => {
  return (
      <div className="bg-white shadow-2xl p-6 rounded-2xl border-2 flex flex-col items-center last-of-type:bg-teal-500 last-of-type:border-teal-700 last-of-type:text-zinc-100 border-zinc-100">
          <div className="gap-8 flex items-center w-full">
            <h2 className={titleStyles}>{title}</h2>
            <span className={styles}>{Icon}</span>
          </div>
          <div className="my-6">
            <div className="flex flex-row space-x-4 items-center">
              <div id="temp">
                <h4 className="text-4xl font-bold">{value}</h4>
              </div>
            </div>
          </div>
      </div>
  );
};
