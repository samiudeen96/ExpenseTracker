// import { FaMoneyBillWave, FaMoneyCheckAlt, FaSignOutAlt } from "react-icons/fa";

import { RiDashboardHorizontalLine } from "react-icons/ri";
import { GrLogout } from "react-icons/gr";
import { CiWallet } from "react-icons/ci";
import { LiaMoneyBillSolid } from "react-icons/lia";

import { LuWallet } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";

export const menu = [
  {
    name: "Dashboard",
    icon: RiDashboardHorizontalLine,
    path: "/dashboard/home",
  },
  { name: "Income", icon: LuWallet, path: "/dashboard/income" },
  { name: "Expense", icon: MdAttachMoney, path: "/dashboard/expense" },
  { name: "Logout", icon: GrLogout },
];
