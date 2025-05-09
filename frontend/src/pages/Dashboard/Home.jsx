import React, { useContext, useEffect, useState } from "react";
import Total from "../../components/Total";
import { ExpContext } from "../../context/ExpContext";
import { IoMdCard } from "react-icons/io";
import { LuWallet } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";
import CardDetails from "../../components/CardDetails";
import CustomPieChart from "../../components/charts/CustomPieChart";
import { currency, prepareExpenseBarChartData, prepareIncomeBarChartData } from "../../utils/helper";
import CustomBarChart from "../../components/charts/CustomBarChart";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom"
import useDashboardData from "../../hooks/useDashboardData";

const Home = () => {
  const { token } = useContext(ExpContext); 
  const [expenseBarChart, setExpenseBarChart] = useState([]);
  const [incomeBarChart, setIncomeBarChart] = useState([]);

  const { data: dashboardData } = useDashboardData(token)



  useEffect(() => {
    const expenseChart = prepareExpenseBarChartData(dashboardData?.lastThirtyDaysExpense.transaction);
    setExpenseBarChart(expenseChart)
    const incomeChart = prepareIncomeBarChartData(dashboardData?.lastSixtyDaysIncome.transaction);
    setIncomeBarChart(incomeChart)

  }, [dashboardData])


  const totalData = dashboardData ? [
    { name: "Total Balance", amount: dashboardData.balance, icon: IoMdCard, color: "bg-primary" },
    { name: "Total Income", amount: dashboardData.income, icon: LuWallet, color: "bg-orange-400" },
    { name: "Total Expense", amount: dashboardData.expense, icon: GiReceiveMoney, color: "bg-red-500" }
  ] : []

  const colors = ["#875cf5", "#ff8904", "#fb2c36"]

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
        {
          totalData.map((item, index) => (
            <Total key={index} Icon={item.icon} amount={item.amount} title={item.name} bgColor={item.color} />
          ))
        }
      </div>

      <div className="mt-5 grid sm:grid-cols-2 grid-cols-1 gap-5">
        <div className=' bg-white p-5 rounded-md shadow-sm'>
          <h2 className='font-medium'>Recent Transactions</h2>
          <div className="mt-5 space-y-5">
            {
              dashboardData?.latestTransaction?.map((item, index) => (
                <CardDetails key={index} item={item} />
              ))
            }
          </div>

        </div>
        <div className=' bg-white p-5 rounded-md shadow-sm'>
          <h2 className='font-medium'>Financial Overview</h2>
          <div className="mt-5 space-y-5">
            <CustomPieChart
              data={totalData}
              label="Total Balance"
              totalAmount={`${currency}${dashboardData?.balance}`}
              colors={colors}
              showTextAnchor
            />
          </div>
        </div>
      </div>


      <div className="mt-5 grid sm:grid-cols-2 grid-cols-1 gap-5">
        <div className=' bg-white p-5 rounded-md shadow-sm'>
          <div className="flex justify-between items-center">
            <h2 className='font-medium'>Expenses</h2>
            <Link to="/dashboard/expense" className="button_tertiary text-text bg-background flex gap-3"><span className="font-medium">See All</span> <IoArrowForward /></Link>
          </div>
          <div className="mt-5 space-y-5">
            {
              dashboardData?.lastThirtyDaysExpense.transaction?.map((item, index) => (
                <CardDetails key={index} item={item} />
              ))
            }
          </div>
        </div>

        <div className=' bg-white p-5 rounded-md shadow-sm'>
          <h2 className='font-medium'>Last 30 Days Expenses</h2>
          <div className="mt-5 space-y-5">
            <CustomBarChart data={expenseBarChart} />
          </div>
        </div>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 grid-cols-1 gap-5">
        <div className=' bg-white p-5 rounded-md shadow-sm'>
          <div className="flex justify-between items-center">
            <h2 className='font-medium'>Incomes</h2>
            <Link to="/dashboard/income" className="button_tertiary text-text bg-background flex gap-3"><span className="font-medium">See All</span> <IoArrowForward /></Link>
          </div>
          <div className="mt-5 space-y-5">
            {
              dashboardData?.lastSixtyDaysIncome.transaction?.map((item, index) => (
                <CardDetails key={index} item={item} />
              ))
            }
          </div>
        </div>

        <div className=' bg-white p-5 rounded-md shadow-sm'>
          <h2 className='font-medium'>Last 60 Days Incomes</h2>
          <div className="mt-5 space-y-5">
            <CustomBarChart data={incomeBarChart} />
          </div>
        </div>
      </div>

    </>
  );
};

export default Home;