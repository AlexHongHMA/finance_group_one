/* eslint-disable */
"use client";

import React, { useState, useMemo, useRef, useCallback } from "react";

import {
  useTable,
  usePagination,
  useFilters,
  useSortBy,
  useGlobalFilter,
} from "react-table";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import MakeTable from "../MakeTable";

export default function SaleInvoiceTable({ oriData }) {
  const [filterInput, setFilterInput] = useState("");
  const searchInputRef = useRef(null);

  const [filters] = useState(["Customer_ID"]);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 140,
      maxWidth: 500,
    }),
    []
  );

  const loading = { show: true, error: "" };

  const tableData = useMemo(() => oriData, [oriData]);

  const columns = useMemo(
    () => [
      {
        Header: "Customer Id",
        accessor: "Customer_ID",
        width: 117,
        maxWidth: 117,
        style: { whiteSpace: "unset" },
      },

      {
        Header: "Company",
        accessor: "COMPANY",
        width: 140,
        maxWidth: 140,
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Gas Type",
        accessor: "GAS_TYPE",
        width: 100,
        maxWidth: 100,
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Tax Payer ID",
        accessor: "Tax_Payer_ID",
        width: 110,
        maxWidth: 110,
        style: { whiteSpace: "unset" },
      },

      {
        Header: "Price per Litre",
        accessor: "Price_per_Litre",
        width: 110,
        maxWidth: 110,
        style: { whiteSpace: "unset" },
      },
      {
        Header: "VAT 7%",
        accessor: "VAT_7_Percent",
        width: 110,
        maxWidth: 110,
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Total Price (Baht)",
        accessor: "Total_Include_VAT",
        width: 140,
        maxWidth: 140,
        style: { whiteSpace: "unset" },
      },
    ],
    []
  );

  const ourGlobalFilterFunction = useCallback(
    (rows, _, query) =>
      rows.filter((row) =>
        filters.find((columnName) => {
          if (
            (columnName === "phone_number"
              ? row.values[columnName].replace(/\s/gi, "")
              : row.values[columnName]
            )
              .toLowerCase()
              .includes(query.toLowerCase())
          ) {
            return row;
          }

          return null;
        })
      ),
    [filters]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: tableData,
      defaultColumn,
      globalFilter: ourGlobalFilterFunction,
      initialState: {
        sortBy: [
          {
            id: "date",
            desc: true,
          },
        ],
        pageSize: 20,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  const propsToTable = {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
  };

  function handleOnSubmitInput(e) {
    e.preventDefault();

    const value = searchInputRef.current.value || "";

    setGlobalFilter(value);

    setFilterInput(value);
  }

  const handleFilterChange = (e) => {
    const value = e.target.value || "";

    if (value === "") {
      setGlobalFilter(value);
    }

    setFilterInput(value);
  };

  return (
    <>
      <div className="mb-8 flex smmx:flex-col justify-between items-end smmx:items-start smmx:space-y-5">
        <div>
          <form
            noValidate
            onSubmit={handleOnSubmitInput}
            autoComplete="off"
            className="flex items-end"
          >
            <div className="mt-1 mr-4 relative rounded-md">
              <label
                htmlFor="searchUser"
                className="block p2 font-bold text-gray-500"
              >
                Search
              </label>
              <Input
                type="text"
                name="searchUser"
                id="searchUser"
                value={filterInput}
                ref={searchInputRef}
                onChange={handleFilterChange}
                className="default-input min-w-[350px] smmx:min-w-[150px]"
                placeholder="Customer Id"
              />
            </div>
            <Button type="submit" className="mr-9">
              Search
            </Button>
          </form>
        </div>
      </div>
      <MakeTable loading={loading} propsToTable={propsToTable} />
    </>
  );
}
