import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { ExpContext } from '../context/ExpContext'
import API from '../services/api'

const useDataList = (token) => {
    const { path } = useContext(ExpContext)
    return useQuery({
        queryKey: ['dataList'],
        queryFn: async () => {
            const endPoint = path.pathname === "/dashboard/income"
                ? `/api/income/list`
                : `/api/expense/list`

            if (endPoint) {
                const response = await API.get(endPoint, token);

                return path.pathname === "/dashboard/income" ? response.data.incomes : response.data.expenses
            }
        },
        enabled: !!token
    })
}

export default useDataList