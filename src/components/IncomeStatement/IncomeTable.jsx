"use client";
import React from "react";

const IncomeTable = ({ oriData }) => {
  let gas95_daily_price = 0;
  let diesel_daily_price = 0;
  let total_sale = 0;
  let gas95_daily_cost = 0;
  let diesel_daily_cost = 0;
  let sale_office_staff = 0;
  let gate_controller = 0;
  let utility_expense = 0;
  let deprection = 0;
  let net_income = 0;

  oriData.forEach((obj) => {
    gas95_daily_price += obj.GAS95_DAILY_PRICE;
    diesel_daily_price += obj.DIESEL_DAILY_PRICE;
    total_sale += obj.TOTAL_REVENUE;
    gas95_daily_cost += obj.GAS95_DAILY_COST;
    diesel_daily_cost += obj.DIESEL_DAILY_COST;
    sale_office_staff += obj["DAY_SALE OFFICE"] + obj["NIGHT_SALE OFFICE"];
    gate_controller += obj["DAY_GATE CONTROL"] + obj["NIGHT_GATE CONTROL"];
    utility_expense += obj["UTILITY EXPENSE"];
    deprection += obj["DEPRECIATION"];
    net_income += obj["OTHER_EXPENSE_TOTAL_EXPENSE"];
  });

  const result = {
    gas95_daily_price,
    diesel_daily_price,
    total_sale,
    gas95_daily_cost,
    diesel_daily_cost,
    total_cogs: gas95_daily_cost + diesel_daily_cost,
    profit: total_sale - (gas95_daily_cost + diesel_daily_cost),
    sale_office_staff,
    gate_controller,
    utility_expense,
    deprection,
    net_income,
  };
  return (
    <div className="max-w-[80%] mx-auto bg-white rounded-lg py-5 px-6">
      <h5 className="text-center font-bold">Monthly Income Statement</h5>
      <p className="p3 font-bold mb-5 text-center">Month March 2022</p>
      <div className="flex flex-col space-y-1">
        <p className="p2 font-bold text-info">Sale:</p>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-5 p3">Gasohol 95</p>
          <p className="col-span-3 p3">
            {result.gas95_daily_price.toLocaleString()}
          </p>
          <p className="col-span-4" />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-5 p3">Diesel</p>
          <p className="col-span-3 p3">
            {result.diesel_daily_price.toLocaleString()}
          </p>
          <p className="col-span-4" />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-5 p3 font-bold">Total Sale</p>
          <p className="col-span-3 p3" />
          <p className="col-span-4 p3 flex justify-end">
            {result.total_sale.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-1 mt-4">
        <p className="p3 font-bold text-negative">Less: Cost of Goods Sold</p>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-5 p3">Gasohol 95</p>
          <p className="col-span-3 p3">
            {result.gas95_daily_cost.toLocaleString()}
          </p>
          <p className="col-span-4" />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-5 p3">Diesel</p>
          <p className="col-span-3 p3">
            {result.diesel_daily_cost.toLocaleString()}
          </p>
          <p className="col-span-4" />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-5 p3 font-bold">Total COGS</p>
          <p className="col-span-3 p3" />
          <p className="col-span-4 p3 flex justify-end">
            {result.total_cogs.toLocaleString()}
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-5 p3 font-bold">Gross Profit</p>
          <p className="col-span-3 p3" />
          <p className="col-span-4 p3 flex justify-end">
            {result.profit.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-1 mt-4">
        <p className="p3 font-bold text-negative">
          Less: Selling and Administration Expense
        </p>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-5 p3">Sale Office Staff</p>
          <p className="col-span-3 p3">
            {result.sale_office_staff.toLocaleString()}
          </p>
          <p className="col-span-4" />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-5 p3">Gate Controller</p>
          <p className="col-span-3 p3">
            {result.gate_controller.toLocaleString()}
          </p>
          <p className="col-span-4" />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-5 p3">Utility Expense</p>
          <p className="col-span-3 p3" />
          <p className="col-span-4 p3 flex justify-end">
            {result.utility_expense.toLocaleString()}
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-5 p3">Depreciation</p>
          <p className="col-span-3 p3" />
          <p className="col-span-4 p3 flex justify-end">
            {result.deprection.toLocaleString()}
          </p>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <p className="col-span-5 p3 font-bold">Net Income (loss)</p>
          <p className="col-span-3 p3" />
          <p className="col-span-4 p3 flex justify-end">
            {result.net_income.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncomeTable;
