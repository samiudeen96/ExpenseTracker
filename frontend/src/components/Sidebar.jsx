import { menu } from "../constants/data";
import { ExpContext } from "../context/ExpContext"
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import InfoModal from "./InfoModal";
import Avatar from "./Avatar";


const Sidebar = () => {
  const { userDetails, menuHandler, infoModal, openInfoModal, setShowSidebar } = useContext(ExpContext)
  const location = useLocation();
  //   const { modalOpenHandler, modal, income, infoModal, openInfoModal } = useContext(ExpContext);



  return (
    // <div className="bg-white h-full w-2/12 fixed shadow-sm">
    <div className="w-64 bg-white border border-r border-gray-200/50 sticky top-0 z-20 h-[100vh]">
      <div className="border-b border-background px-5 py-4">
        <h2 className="text-lg text-primary font-medium">Expense Tracker</h2>
      </div>
      <div className="p-5">
        <div className="flex flex-col items-center pt-5">
          {/* <div className="bg-background h-20 w-20 rounded-full">
            <img className="shadow-sm" src='' alt="" />
          </div>
          <p className="mt-3 font-medium">{userDetails.name}</p> */}
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

        {infoModal && <InfoModal />}
        {/* <div
          className={`flex gap-3 items-center hover:text-white hover:bg-primary px-5 py-3 rounded-md cursor-pointer`}
        >
          <div className=""><GrLogout className="w-5 h-5" /></div>
          <div><p>Logout</p></div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
