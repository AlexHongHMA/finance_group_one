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
import moment from "moment";
import MakeTable from "../MakeTable";

export default function JournalTable({ oriData = [] }) {
  const loading = { show: true, error: "" };

  const [searchData, setSearchData] = useState({});
  const [filterInput, setFilterInput] = useState("");
  const searchInputRef = useRef(null);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 140,
      maxWidth: 500,
    }),
    []
  );

  const [filters] = useState(["Ref_No"]);

  const data = useMemo(() => oriData, [oriData]);

  const CellDate = (tableProps) => {
    const component = useMemo(
      () => moment(tableProps.row.original.date).format("DD MMM YYYY"),
      [tableProps]
    );

    return component;
  };

  const CellTitle = (tableProps) => {
    const component = useMemo(
      () => <p>{tableProps.row.original.Account_Title_and_explanation}</p>,
      [tableProps]
    );

    return component;
  };

  const CellDebit = (tableProps, title) => {
    const component = useMemo(
      () => (
        <p>
          {title === "debit"
            ? tableProps.row.original.Debit.toLocaleString()
            : tableProps.row.original.Credit.toLocaleString()}
        </p>
      ),
      [tableProps]
    );

    return component;
  };

  const COLUMNS = [
    {
      Header: "Date",
      accessor: "date",
      width: 94,
      maxWidth: 94,
      Cell: (tableProps) => CellDate(tableProps),
    },
    {
      Header: "Account Title and explanation",
      accessor: "Account_Title_and_explanation",
      width: 164,
      maxWidth: 164,
      Cell: (tableProps) => CellTitle(tableProps),
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Ref No",
      accessor: "Ref_No",
      width: 104,
      maxWidth: 104,
    },
    {
      Header: "Debit",
      accessor: "Debit",
      width: 104,
      maxWidth: 104,
      Cell: (tableProps) => CellDebit(tableProps, "debit"),
    },
    {
      Header: "Credit",
      accessor: "Credit",
      width: 104,
      maxWidth: 104,
      Cell: (tableProps) => CellDebit(tableProps, "credit"),
    },
  ];
  const columns = useMemo(() => COLUMNS, []);

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
      data: data,
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
      setSearchData([]);
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
                placeholder="Ref no"
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
