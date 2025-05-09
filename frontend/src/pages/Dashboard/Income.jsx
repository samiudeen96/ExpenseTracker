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
import CustomLineChart from "../../components/charts/CustomLineChart"
import { useDataList } from '../../hooks/useDataList';





const Income = () => {
  const { openInputModal, modal, data, infoModal, openInfoModal, token } = useContext(ExpContext);
  const { data: dataList } = useDataList(token)

  // const handleSubmit

  const extractedDate = (item) => {
    const date = new Date(item.date);

    if (isNaN(date)) {
      console.error("Invalid date:", item.date);
      return null;
    }

    // Get local date parts
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className=" bg-white shadow-sm rounded-md p-5">
        <div className='flex justify-between w-full items-center'>
          <h2 className='font-medium'>Income Overview</h2>
          <button className='button_secondary' onClick={() => openInputModal()}><FaPlus /> Add Income</button>
        </div>
        <p className='text_primary mt-2 sm:mt-0'>Track your earnings over time and analyze your income trends.</p>

        {dataList?.length > 0 && (
          <div className='mt-5'>
            <CustomLineChart data={dataList} />
          </div>
        )}
      </div>

      {dataList?.length > 0 && (
        <div className='bg-white p-5 mt-5 rounded-md overflow-hidden shadow-sm'>
          <h2 className='font-medium'>Income Source</h2>
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

export default Income