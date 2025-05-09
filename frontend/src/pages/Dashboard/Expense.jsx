import React, { useContext, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6";
import { ExpContext } from '../../context/ExpContext';
import InputModal from '../../components/InputModal';
import { GoPlus } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import InfoModal from '../../components/InfoModal';
import { CiImageOn } from "react-icons/ci";
import CardDetails from '../../components/CardDetails';
import CustomLineChart from '../../components/charts/CustomLineChart';
import { useDataList } from '../../hooks/useDataList';

const Expense = () => {
  const { openInputModal, modal, data, infoModal, openInfoModal, token } = useContext(ExpContext);
  const { data: dataList } = useDataList(token)

  const extractedDate = (item) => {
    const date = new Date(item.date);
    const onlyDate = date.toISOString().split("T")[0];
    return onlyDate;
  }

  const roundedNumber = (item) => {
    return Number(item.amount).toFixed(0)
  }


  return (
    <>
      <div className=" bg-white shadow-sm rounded-md p-5">
        <div className='flex justify-between w-full items-center'>
          <h2 className='font-medium'>Expense Overview</h2>
          <button className='button_secondary' onClick={() => openInputModal()}><FaPlus /> Add Expense</button>
        </div>
        <p className='text_primary mt-2 sm:mt-0'>Track your spending over time and analyze your expense trends.</p>

        {dataList.length > 0 && (
          <div className='mt-5'>
            <CustomLineChart data={dataList} />
          </div>
        )}
      </div>



      {dataList.length > 0 && (
      <div className='bg-white p-5 mt-5 rounded-md overflow-hidden shadow-sm'>
        <h2 className='font-medium'>Expense Categories</h2>
        <div className='grid sm:grid-cols-2 gap-5 mt-5'>
          {dataList?.map((item, index) =>
            <CardDetails key={index} item={item} openInfoModal={openInfoModal} extractedDate={extractedDate} />
          )}
        </div>
      </div>
       )}

      {modal && <InputModal />}
      {infoModal && <InfoModal />}
    </>
  )
}

export default Expense