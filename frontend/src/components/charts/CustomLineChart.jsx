import React from 'react'
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart
} from "recharts"
import { currency } from '../../utils/helper'

const CustomLineChart = ({ data }) => {

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
          <p className='text-xs font-semibold text-primary mb-1'>{payload[0].payload.resource}</p>
          <p className='text-sm text-gray-600'>
            Amount: <span className='text-sm font-medium text-gray-900'>{currency}{payload[0].payload.amount}</span>
          </p>
        </div>
      )
    }

    return null;
  }


  // const maxAmount = Math.max(...data?.map(item => item.amount));
  const maxAmount = Math.max(...(data?.map(item => item.amount) || [0]));


  return (
    <div className='bg-white'>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" xl="0" yl="0" x2="0" y2="1" >
              <stop offset="5%" stopColor='#785bf8' stopOpacity={0.4} />
              <stop offset="95%" stopColor='#785bf8' stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke='none' />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
          {/* <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke='none' /> */}
          <YAxis
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="none"
                        domain={[0, Math.ceil(maxAmount * 1.2)]}
                    />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke='#785bf8'
            fill='url(#incomeGradient)'
            strokeWidth={3}
            dot={{ r: 3, fill: "#ab8df8" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart