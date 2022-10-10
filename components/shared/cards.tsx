import { NextPage } from "next";
import React from "react";

interface IProps {
  cardStyle: string;
  styles: string;
  title: string;
  titleStyles: string;
  Icon: any;
  value: string | number;
}

export const Card: NextPage<IProps> = ({ cardStyle, title, value, Icon, styles, titleStyles }) => {
  return (
      <div className={cardStyle}>
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
