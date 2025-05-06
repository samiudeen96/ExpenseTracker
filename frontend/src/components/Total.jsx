import React, { useContext } from "react";
import { ExpContext } from "../context/ExpContext";
import { currency } from "../utils/helper";

const Total = ({ Icon, amount, title, bgColor }) => {
  return (
    <div className="flex-1">
      <div className="shadow-sm flex bg-white rounded-md p-4 items-center gap-4">
        <div className={`rounded-full w-11 h-11 ${bgColor} flex items-center justify-center shadow-md`}>
          <Icon className="text-white w-6 h-6" />
        </div>
        <div>
          <p className="text-sm">{title}</p>
          <p className="text-lg font-medium"> {currency} {amount}</p>
        </div>
      </div>
    </div>
  );
};

export default Total;
