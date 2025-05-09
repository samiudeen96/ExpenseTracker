import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { ExpContext } from '../context/ExpContext'
import API from '../services/api'



export const useDataList = () => {
    const { path } = useContext(ExpContext)

    return useQuery({
        queryKey: ['dataList'],
        queryFn: async () => {
            const endPoint = path.pathname === "/dashboard/income"
                ? `/api/income/list`
                : `/api/expense/list`
            if (endPoint) {
                const response = await API.get(endPoint);
                return path.pathname === "/dashboard/income" ? response.data.incomes : response.data.expenses
            }
        },
        // enabled: !!token
    })
}


export const useCreateData = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ newData, path }) => {
            const endPoint = path === "/dashboard/income"
                ? `/api/income/add`
                : `/api/expense/add`;

            const response = await API.post(endPoint, newData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['dataList']);
        },
        onError: (error) => {
            console.error("Mutation error:", error);
        }
    });
}

export const useDeleteData = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ path, id }) => {
            const endPoint = path === "/dashboard/income"
                ? `/api/income/remove/${id}`
                : `/api/expense/remove/${id}`

            const response = await API.delete(endPoint);
            return response;
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries(['dataList'])
        },
        onError: (error) =>{
            console.error("Mutation error:", error); 
        }
    })

}


// export default useDataList