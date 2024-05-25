"use client";

import React, { useCallback, useMemo, useState } from "react";

import {
  useTable,
  usePagination,
  useFilters,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import MakeTable from "../MakeTable";

function StockTable({ oriData }) {
  const loading = { show: true, error: "" };
  const [filters] = useState(["Ref_No"]);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 20,
      width: 140,
      maxWidth: 500,
    }),
    []
  );

  const data = useMemo(() => oriData, [oriData]);

  const CellAmount = (tableProps, title) => {
    const component = useMemo(
      () => (
        <p>
          {title === "diesel"
            ? tableProps.row.original.diesel.toLocaleString()
            : tableProps.row.original.gasohol95.toLocaleString()}
        </p>
      ),
      [tableProps]
    );

    return component;
  };

  const COLUMNS = [
    {
      Header: "Patrol Type",
      accessor: "patrol_type",
      width: 164,
      maxWidth: 164,
      style: { whiteSpace: "unset" },
    },
    {
      Header: "Diesel",
      accessor: "diesel",
      width: 164,
      maxWidth: 164,
      Cell: (tableProps) => CellAmount(tableProps, "diesel"),
    },
    {
      Header: "Gasohol95",
      accessor: "gasohol95",
      width: 104,
      maxWidth: 104,
      Cell: (tableProps) => CellAmount(tableProps, "gas"),
    },
  ];
  const columns = useMemo(() => COLUMNS, []);

  const ourGlobalFilterFunction = useCallback(
    (rows, _, query) =>
      rows.filter((row) =>
        filters.find((columnName) => {
          if (
            row.values[columnName].toLowerCase().includes(query.toLowerCase())
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

  return (
    <>
      <p className="p2 font-bold pb-2">Inventory Stock</p>
      <MakeTable loading={loading} propsToTable={propsToTable} />
    </>
  );
}

export default StockTable;
