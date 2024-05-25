"use client";

import React, { useCallback, useMemo, useState, useRef } from "react";

import {
  useTable,
  usePagination,
  useFilters,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import MakeTable from "../MakeTable";
import moment from "moment";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function LedgerTable({ oriData }) {
  const loading = { show: true, error: "" };
  const [filters] = useState(["RefNo"]);
  const [filterInput, setFilterInput] = useState("");
  const searchInputRef = useRef(null);
  const [dropdownFilter, setDropdownFilter] = useState("All");

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 140,
      maxWidth: 500,
    }),
    []
  );

  const data = useMemo(() => oriData, [oriData]);

  const CellDate = (tableProps) => {
    const component = useMemo(
      () => (
        <p>
          {tableProps.row.original.Date ? (
            moment(tableProps.row.original.Date).format("DD MMM YYYY")
          ) : (
            <span>-</span>
          )}
        </p>
      ),
      [tableProps]
    );

    return component;
  };

  const CellAmount = (rawData) => {
    const component = useMemo(
      () => <p>{rawData ? rawData.toLocaleString() : "-"}</p>,
      [rawData]
    );

    return component;
  };

  const COLUMNS = [
    {
      Header: "Date",
      accessor: "Date",
      width: 164,
      maxWidth: 164,
      style: { whiteSpace: "unset" },
      Cell: (tableProps) => CellDate(tableProps),
    },
    {
      Header: "Ref Number",
      accessor: "RefNo",
      width: 164,
      maxWidth: 164,
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Account Type",
      accessor: "Type",
      width: 164,
      maxWidth: 164,
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Credit",
      accessor: "Credit",
      width: 164,
      maxWidth: 164,
      style: { whiteSpace: "unset" },
      Cell: (tableProps) => CellAmount(tableProps.row.original.Credit),
    },
    {
      Header: "Debit",
      accessor: "Debit",
      width: 164,
      maxWidth: 164,
      style: { whiteSpace: "unset" },
      Cell: (tableProps) => CellAmount(tableProps.row.original.Debit),
    },
  ];
  const columns = useMemo(() => COLUMNS, []);

  const ourGlobalFilterFunction = useCallback(
    (rows, _, query) =>
      rows.filter((row) =>
        filters.find((columnName) => {
          if (
            row.values[columnName]?.toLowerCase().includes(query.toLowerCase())
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
    setFilter,
    preGlobalFilteredRows,
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
    }

    setFilterInput(value);
  };

  const dropdownOptions = useMemo(() => {
    const options = new Set();
    preGlobalFilteredRows.forEach((row) => {
      options.add(row.values.Type);
    });
    const mySet = new Set(
      Array.from(options).filter((value) => value !== null)
    );

    return ["All", ...mySet.values()];
  }, [preGlobalFilteredRows]);

  const handleFilterDropdown = useCallback((value) => {
    if (value === "All") {
      setFilter("Type", undefined);
      setDropdownFilter("All");
    } else {
      setFilter("Type", value || undefined);
      setDropdownFilter(value);
    }
  }, []);

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
        <div>
          <p className="p3 font-bold mb-1">Account Type</p>
          <Select value={dropdownFilter} onValueChange={handleFilterDropdown}>
            <SelectTrigger className="w-[180px] smmx:w-[200px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {dropdownOptions.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <MakeTable loading={loading} propsToTable={propsToTable} />
    </>
  );
}

export default LedgerTable;
