import React, { useContext, useState } from "react";
import line_chart from "../../assets/line_chart.svg";
import Login from "./Login";
import Signup from "./Signup";
import { ExpContext } from "../../context/ExpContext";

const Auth = () => {
  const { tab, setTab } = useContext(ExpContext);

  return (
    <div className=" min-h-screen min-w-screen flex items-center justify-center">
      <div className="sm:w-6/12 md:w-6/12  flex items-center flex-wrap">
        <div className="flex-1/2">
          <div className="flex flex-col justify-center items-center gap-2 p-5 text-center">
            <img className="w-20 h-20" src={line_chart} alt="" />
            <h2 className="text-lg font-semibold">Expense Tracker</h2>
            <p className="text-sm">
              Track your spending, manage your income, and take control of your
              finances.
            </p>
          </div>
        </div>
        <div className="flex-1/2 shadow-sm p-10 rounded-md bg-white">
          <div className="flex border-2 border-[#785bf8] rounded-md overflow-hidden p-[2px]">
            {tabHeader.map((item, index) => (
              <button
                key={index}
                className={`button_primary flex-1  ${
                  item.name === tab
                    ? "hover:bg-[#674de0] transition"
                    : "text-black bg-white"
                }`}
                onClick={() => setTab(item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* tab content */}

          {tab === "Login" && <Login />}
          {tab === "Signup" && <Signup />}
        </div>
      </div>
    </div>
  );
};

const tabHeader = [
  {
    name: "Login",
  },
  {
    name: "Signup",
  },
];

export default Auth;
