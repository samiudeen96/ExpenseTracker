// import { FaMoneyBillWave, FaMoneyCheckAlt, FaSignOutAlt } from "react-icons/fa";

import { RiDashboardHorizontalLine } from "react-icons/ri";
import { GrLogout } from "react-icons/gr";
import { CiWallet } from "react-icons/ci";
import { LiaMoneyBillSolid } from "react-icons/lia";

export const menu = [
  {
    name: "Dashboard",
    icon: RiDashboardHorizontalLine,
    path: "/dashboard/home",
  },
  { name: "Income", icon: CiWallet, path: "/dashboard/income" },
  { name: "Expense", icon: LiaMoneyBillSolid, path: "/dashboard/expense" },
  { name: "Logout", icon: GrLogout },
];
