/* eslint-disable */
"use client";

import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";

import {
  useTable,
  usePagination,
  useFilters,
  useSortBy,
  useGlobalFilter,
} from "react-table";

import MakeSSRTable from "../MakeSSRTable";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function OrderRecord() {
  const [isSearching, setIsSearching] = useState(false);
  const [oriData, setOriData] = useState({});
  const [searchData, setSearchData] = useState({});
  const [filterInput, setFilterInput] = useState("");
  const searchInputRef = useRef(null);

  const [filters] = useState(["Customer_ID"]);

  const [paginationIndex, setPaginationIndex] = useState(1);

  async function getOrderData() {
    setIsSearching(true);
    const res = await fetch(
      `${process.env.APP_URL}/api/purchasing-order?page=${paginationIndex}&limit=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    if (!res.ok) {
      console.log("Failed to fetch data");
    }
    const orders = await res.json();
    setOriData(orders?.data);
    setIsSearching(false);
  }

  useEffect(() => {
    getOrderData();
  }, [paginationIndex]);

  // console.log(queryParams);

  const dataStatus = {
    show: oriData?.data || false,
    error: false,
  };

  const tableData = useMemo(
    () => oriData?.data?.recordset || [],
    [oriData?.data?.recordset]
  );

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
        accessor: "Company",
        width: 140,
        maxWidth: 140,
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Gas Type",
        accessor: "Gas_Type",
        width: 100,
        maxWidth: 100,
        style: { whiteSpace: "unset" },
      },
      {
        Header: "PO No",
        accessor: "PO_No",
        width: 100,
        maxWidth: 100,
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Volume Litre",
        accessor: "Volume_Litre",
        width: 110,
        maxWidth: 110,
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Price per Litre",
        accessor: "Price_per_Litre",
        width: 140,
        maxWidth: 140,
        style: { whiteSpace: "unset" },
      },
      {
        Header: "Total Price (Baht)",
        accessor: "Total_Price_Baht",
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
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setFilter,
    setGlobalFilter,

    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data:
        searchData?.data?.recordset.length > 0
          ? searchData?.data?.recordset
          : tableData,
      globalFilter: ourGlobalFilterFunction,

      initialState: {
        pageIndex: paginationIndex - 1,
        sortBy: [
          {
            id: "last_transation_date",
            desc: true,
          },
        ],
        pageSize: 10,
      },
      manualPagination: Object.keys(searchData).length === 0, // Tell the usePagination
      pageCount: searchData?.total_pages
        ? searchData?.total_pages
        : oriData?.total_pages,
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
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize,
    pageCount: searchData?.total_pages
      ? searchData?.total_pages
      : oriData?.total_pages,
  };

  async function handleOnSubmitInput(e) {
    e.preventDefault();

    const value = searchInputRef.current.value || "";

    setIsSearching(true);
    const res = await fetch(`${process.env.APP_URL}/api/purchasing-order/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ search: value }),
    });

    if (!res.ok) {
      console.log("Failed to fetch data");
    }
    const orders = await res.json();
    setSearchData(orders?.data);

    setIsSearching(false);

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
                placeholder="Customer Id"
              />
            </div>
            <Button type="submit" className="mr-9">
              Search
            </Button>
          </form>
        </div>
      </div>
      {!isSearching && searchData?.data?.recordset?.length === 0 ? (
        <div>There is no result for this.</div>
      ) : (
        <MakeSSRTable
          loading={dataStatus}
          propsToTable={propsToTable}
          setPaginationIndex={setPaginationIndex}
          isSearching={isSearching}
          searchData={Object.keys(searchData).length === 0}
          // FilterDate={Filter}
        />
      )}
    </>
  );
}
