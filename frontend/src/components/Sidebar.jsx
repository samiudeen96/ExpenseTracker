import { menu } from "../constants/data";
import { ExpContext } from "../context/ExpContext"
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import InfoModal from "./InfoModal";
import Avatar from "./Avatar";
import line_chart from "../assets/line_chart.svg";
import { useQuery } from "@tanstack/react-query";
import API from "../services/api";


const Sidebar = () => {
  const { userDetails, menuHandler, openInfoModal, setShowSidebar, token } = useContext(ExpContext)
  const location = useLocation();




  return (
    <div className="w-64 bg-white border border-r border-gray-200/50 sticky top-0 z-20 h-[100vh]">
      <div className='flex items-center gap-2 shadow-sm px-5 py-4'>
        <img className="w-7 h-7" src={line_chart} alt="" />
        <h2 className='font-medium text-lg text-primary'>Expense Tracker</h2>
      </div>
      <div className="p-5">
        <div className="flex flex-col items-center pt-5">
          <Avatar />
        </div>

        {/* menu */}
        <div className="mt-10 space-y-2">
          {menu.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => menuHandler(item)}
                className={`flex gap-3 items-center hover:text-white hover:bg-primary ${item.path === location.pathname ? "bg-primary text-white" : ""} px-5 py-3 rounded-md cursor-pointer`}
              >
                <div className=""><Icon className="w-5 h-5" /></div>
                <div><p>{item.name}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
