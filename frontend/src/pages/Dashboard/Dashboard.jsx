import React, { useContext } from "react";
import Sidebar from "../../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Income from "./Income";
import Expense from "./Expense";
import Header from "../../components/Header";
import { ExpContext } from "../../context/ExpContext";
import InfoModal from "../../components/InfoModal";
import LoadingWindow from "../../components/LoadingWindow";

const Dashboard = () => {
    const { showSidebar, setShowSidebar, infoModal } = useContext(ExpContext)

    return (

        <div className="flex relative">
            {/* Desktop Sidebar */}
            <div className="max-[1080px]:hidden">
                <Sidebar />
            </div>

            {/* Mobile Header */}
            <div className="grow">
                <div className="max-[1080px]:block hidden sticky top-0 z-30">
                    <Header setShowSidebar={setShowSidebar} />
                </div>

                <div className="m-5">
                    <Routes>
                        <Route path="home" element={<Home />} />
                        <Route path="income" element={<Income />} />
                        <Route path="expense" element={<Expense />} />


                    </Routes>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-50 transition-opacity duration-300 ${showSidebar ? "bg-transparent bg-opacity-60" : "pointer-events-none opacity-0"
                    }`}
                onClick={() => setShowSidebar(false)}
            >
                <div
                    className={`fixed top-0 left-0 h-ful transition-transform duration-300 ease-in-out transform ${showSidebar ? "translate-x-0" : "-translate-x-full"
                        }`}
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside sidebar
                >
                    <Sidebar setShowSidebar={setShowSidebar} />
                </div>
            </div>
            {infoModal && <InfoModal />}

            {/* <LoadingWindow /> */}


        </div>



    );
}

export default Dashboard