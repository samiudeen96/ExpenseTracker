import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';

const useDashboardData = (token) => {
    return useQuery({
        queryKey: ['dashboardData'],
        queryFn: async () => {
            const { data } = await API.get("/api/dashboard/totalAmount", token);
            const total = data.totalAmt;

            return ({
                balance: total.totalBalance || 0,
                income: total.totalIncome || 0,
                expense: total.totalExpense || 0,
                latestTransaction: data.recentTransactions || [],
                lastThirtyDaysExpense: data.last30DaysExpenses || [],
                lastSixtyDaysIncome: data.last60DaysIncomes || [],
            })

        },
        enabled: !!token


    })
}

export default useDashboardData;


