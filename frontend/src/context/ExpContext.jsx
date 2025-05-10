import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useQuery } from "@tanstack/react-query"
import { useCreateData, useDeleteData } from "../hooks/useDataList";

export const ExpContext = createContext();

const ExpContextProvider = ({ children }) => {
  const navigate = useNavigate();


  // api endpoint
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const path = useLocation()
  const routes = {
    income: "/dashboard/income",
    expense: "/dashboard/expense"
  };

  // initial form state
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    display_picture: "",
  };


  // useState
  const [tab, setTab] = useState("Login");  // tab properties in Auth page
  const [formData, setFormData] = useState(initialFormData);
  const [token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    display_picture: ''
  })

  const [showSidebar, setShowSidebar] = useState(false);


  // useEffect
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  // useEffect(() => {
  //   if (token) {
  //     // getUserInfo();
  //     getTotalAmount();
  //   }
  // }, [token]);

  // useEffect(() => {
  //   if (token) {
  //     getDataList();
  //   }
  // }, [token, path.pathname]);


  // Handler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (tab === "Signup") {
      try {
        const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          display_picture: formData.display_picture,
        };

        const response = await axios.post(
          `${backendUrl}/api/user/register`,
          newUser
        );

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          toast.success("Successfully registered!");
          setFormData(initialFormData);
          setTab("Login");

        }
      } catch (error) {
        toast.error(error.response.data.message)
      }

    }

    if (tab === "Login") {
      // setLoading(true);
      try {
        const user = {
          email: formData.email,
          password: formData.password,
        };

        // const response = await axios.post(`${backendUrl}/api/user/login`, user);
        const response = await API.post("/api/user/login", user)
        const newToken = response.data.token;
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setFormData(initialFormData);

        // Wait 1 second to show loading screen (optional)
        // setTimeout(() => setLoading(false), 2500); // 500ms delay
        navigate("/dashboard/home");


      } catch (error) {
        toast.error(error.response.data.message)
        // setLoading(false);
      }
    }
  };

  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const response = await API.get('/api/user/profile');
      return response.data.user;
    },
    enabled: !!token,
  });

  // const getUserInfo = async () => {
  //   if (token) {
  //     // const response = await axios.get(`${backendUrl}/api/user/profile`, {
  //     //   headers: {
  //     //     Authorization: `Bearer ${token}`
  //     //   }
  //     // });
  //     const response = await API.get("/api/user/profile")
  //     // console.log(response.data.user);
  //     setUserDetails(response.data.user);
  //     // console.log(userDetails);
  //   }
  // }

  const [modal, setModal] = useState(false);
  const [modalFormData, setModalFormData] = useState({
    resource: '', amount: '', image: '', date: ''
  });
  const [modalFormFields, setModalFormFields] = useState({})

  const modalConfigs = {
    [routes.income]: {
      modalName: "Add Income",
      label1: "Income Source",
      name1: "resource",
      placeholder1: "Freelance, Salary, etc",
      label2: "Amount",
      name2: "amount",
      placeholder2: "0000",
      label3: "Date",
      name3: "date"
    },
    [routes.expense]: {
      modalName: "Add Expense",
      label1: "Category",
      name1: "resource",
      placeholder1: "Rent, Groceries, etc",
      label2: "Amount",
      name2: "amount",
      placeholder2: "0000",
      label3: "Date",
      name3: "date",
      placeholder3: "dd/mm/yyyy"
    }
  };

  const openInputModal = () => {
    const config = modalConfigs[path.pathname];
    if (config) {
      setModalFormFields(config);
      setModalFormData({ resource: "", amount: "", image: "", date: "" });
      setModal(true);
    }
  };

  const createData = useCreateData();
  const deleteData = useDeleteData();

  const modalInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setModalFormData((prev) => ({ ...prev, [name]: value }))
  }


  const onModalSubmitHandler = async (e) => {
    e.preventDefault();

    const commonData = {
      amount: modalFormData.amount,
      image: modalFormData.image,
      date: modalFormData.date,
    }

    if (path.pathname === routes.income) {
      const newData = {
        ...commonData,
        source: modalFormData.resource,
      }

      createData.mutate(
        { newData, path: path.pathname },
        {
          onSuccess: () => {
            setModal(false);
            toast.success("Income has successfully added");
          },
          onError: () => {
            toast.error("All the Fields are required")
          }
        }
      )
    }

    if (path.pathname === routes.expense) {
      const newData = {
        ...commonData,
        category: modalFormData.resource
      }

      createData.mutate(
        { newData, path: path.pathname },
        {
          onSuccess: () => {
            setModal(false),
              toast.success("Expense has successfully added")
          },
          onError: () => {
            toast.error("All the Fields are required")
          }
        }
      )
    }
  }


  // Info Modal Properties
  const [infoModal, setInfoModal] = useState(false);
  const [infoContent, setInfoContent] = useState({})

  const openInfoModal = (id) => {

    if (path.pathname === routes.income) {
      console.log("info modal");
      setInfoModal(true)
      setInfoContent({
        text: "Are you sure you want to delete this income?",
        buttonName: "Delete",
        color: "bg-red-500",
        handler: function () {
          deleteData.mutate(
            { path: path.pathname, id },
            {
              onSuccess: () => {
                toast.success("Income has deleted successfully");
                setInfoModal(false)
              },
              onError: () => {
                toast.error("Something went wrong");
              }
            }
          )
        }
      })
    }

    if (path.pathname === routes.expense) {
      console.log("info modal");
      setInfoModal(true)
      setInfoContent({
        text: "Are you sure you want to delete this expense?",
        buttonName: "Delete",
        color: "bg-red-500",
        handler: async function () {
          deleteData.mutate(
            { path: path.pathname, id },
            {
              onSuccess: () => {
                toast.success("Expense has deleted successfully");
                setInfoModal(false)
              },
              onError: () => {
                toast.error("Something went wrong");
              }
            }
          )
        }
      })
    }
  }

  const menuHandler = (item) => {
    if (item.name === "Logout") {
      setInfoModal(true)
      setShowSidebar(false);
      setInfoContent({
        text: "Are you sure you want to log out?",
        buttonName: "Logout",
        color: "bg-primary",
        handler: function () {
          navigate("/");
          localStorage.removeItem("token");
          setToken("");
          setInfoModal(false)
        }
      })
    } else {
      navigate(item.path);
      setShowSidebar(false);
    }

  };

  // Dashboard page
  const [amount, setAmount] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    latestTransaction: [],
    lastThirtyDaysExpense: [],
    lastSixtyDaysIncome: []
  });

  const getInExcel = async () => {
    const excelName = path.pathname === routes.income ? 'income' : 'expense'
    try {
      const endPoint = path.pathname === routes.income ? '/api/income/download' : '/api/expense/download'
      const response = await API.get(endPoint, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${excelName}_details.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      // console.log(response);
    } catch (error) {
      console.log(`Error downloading ${excelName} `, error);
      toast.error(`Faild to download ${excelName} details. Please try again later`)
    }
  }



  // const getTotalAmount = async () => {
  //   try {
  //     if (token) {
  //       const response = await axios.get(`${backendUrl}/api/dashboard/totalAmount`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       });

  //       const total = response.data.totalAmt;
  //       // console.log(response.data);

  //       const latestTransactions = response.data.recentTransactions;
  //       // console.log(transactions);
  //       const lastThirtyDaysExpenses = response.data.last30DaysExpenses

  //       const lastSixtyDaysIncomes = response.data.last60DaysIncomes


  //       setAmount({
  //         balance: total.totalBalance || 0,
  //         income: total.totalIncome || 0,
  //         expense: total.totalExpense || 0,
  //         latestTransaction: latestTransactions || [],
  //         lastThirtyDaysExpense: lastThirtyDaysExpenses || [],
  //         lastSixtyDaysIncome: lastSixtyDaysIncomes || []
  //       })
  //     }
  //   } catch (error) {
  //     console.log(error);

  //   }
  // }


  const value = {
    token,
    path,
    tab,
    setTab,
    formData,
    backendUrl,
    setFormData,
    onChangeHandler,
    onSubmitHandler,
    userDetails,
    menuHandler,
    openInputModal,
    modal,
    setModal,
    modalFormFields,
    modalFormData,
    modalInputChangeHandler,
    onModalSubmitHandler,

    // data, // info Modal properties
    infoModal,
    setInfoModal,
    infoContent,
    setInfoContent,
    openInfoModal,
    amount,
    showSidebar,
    setShowSidebar,
    userInfo,
    userLoading,
    getInExcel

  };

  return <ExpContext.Provider value={value}>{children}</ExpContext.Provider>;
};

export default ExpContextProvider;
