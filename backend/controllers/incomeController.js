import { extractedDate } from "../helper/helper.js";
import {
  addIncomeByUser,
  deleteIncomeByUser,
  getIncomesByUser,
} from "../models/incomeModel.js";

import xlsx from "xlsx";

const addIncome = async (req, res) => {
  const userId = req.user.id;
  const { source, amount, image, date } = req.body;
  //   console.log(req);

  try {
    const addedDetails = await addIncomeByUser(
      userId,
      source,
      amount,
      image,
      date
    );
    res.status(201).json({
      success: true,
      message: addedDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getIncomes = async (req, res) => {
  const userId = req.user.id;

  try {
    const incomes = await getIncomesByUser(userId);
    res.status(200).json({
      success: true,
      incomes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteIncome = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  try {
    await deleteIncomeByUser(id, userId);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// const getIncomeInExcel = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const incomeExcel = await getIncomesByUser(userId);

//     const data = incomeExcel.map((item) => ({
//       Source: item.resource,
//       Amount: item.amount,
//       Date: extractedDate(item.date),
//     }));

//     const wb = xlsx.utils.book_new();
//     const ws = xlsx.utils.json_to_sheet(data);
//     xlsx.utils.book_append_sheet(wb, ws, "income");
//     xlsx.writeFile(wb, "income_details.xlsx");
//     res.download("income_details.xlsx");
//   } catch (error) {
//     res.status(500).json({ 
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

const getIncomeInExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const incomeExcel = await getIncomesByUser(userId);

    const data = incomeExcel.map((item) => ({
      Source: item.resource,
      Amount: Number(Number(item.amount).toFixed(0)),
      Date: extractedDate(item.date),
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "income");

    // Write to buffer instead of file
    const excelBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });

    // Set headers
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=income_details.xlsx'
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    // Send buffer
    res.send(excelBuffer);
  } catch (error) {
    console.error("Excel export error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server Error",
    });
  }
};


export { addIncome, getIncomes, deleteIncome, getIncomeInExcel };
