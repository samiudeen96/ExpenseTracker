import React, { useContext, useState } from "react";
import line_chart from "../../assets/line_chart.svg";
import Login from "./Login";
import Signup from "./Signup";
import { ExpContext } from "../../context/ExpContext";

const Auth = () => {
  const { tab, setTab  } = useContext(ExpContext);

  return (
    <div className=" min-h-screen min-w-screen flex items-center justify-center">
      <div className="min-[1080px]:w-8/12  grid grid-cols-2 max-[1080px]:grid-cols-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col justify-center items-center gap-2 p-5 text-center">
            <img className="w-20 h-20" src={line_chart} alt="" />
            <h2 className="text-lg font-semibold">Expense Tracker</h2>
            <p className="text-sm">
              Track your spending, manage your income, and take control of your
              finances.
            </p>
          </div>
        </div>
        <div className="sm:shadow-sm sm:p-10 p-5 rounded-md bg-white">
          <div className="flex border-2 h-13 border-[#785bf8] rounded-md overflow-hidden p-[2px]">
            {tabHeader.map((item, index) => (
              <button
                key={index}
                className={`button_primary flex-1  ${item.name === tab
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
