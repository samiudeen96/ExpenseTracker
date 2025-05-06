import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts";
import { currency } from '../../utils/helper';

const CustomBarChart = ({ data }) => {

    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb"
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    <p className='text-xs font-semibold text-primary mb-1'>{payload[0].payload.category}</p>
                    <p className='text-sm text-gray-600'>
                        Amount: <span className='text-sm text-gray-900 font-medium'>{currency}{payload[0].payload.amount}</span>
                    </p>
                </div>
            )
        }

        return null;
    }

    const maxAmount = Math.max(...data.map(item => item.amount));

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke='none' />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} stroke='none' />

                    <YAxis
                        tick={{ fontSize: 12, fill: "#555" }}
                        stroke="none"
                        domain={[0, Math.ceil(maxAmount * 1.2)]}
                    />
                    <Tooltip content={<CustomTooltip />} />

                    <Bar
                        dataKey="amount"
                        fill='#FF8042'
                        radius={[7, 7, 0, 0]}
                        activeDot={{ r: 8, fill: "yellow" }}
                        activeStyle={{ fill: "green" }}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>

                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default CustomBarChart