"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
  createColumnHelper,
} from "@tanstack/react-table";
import { useState } from "react";
import Link from "next/link";

const columnHelper = createColumnHelper();

function priceChangeClass(price) {
  parseFloat(price) < 0 ? "text-red-500" : "text-green-500";
}

const buildColumns = (handleButtonClick, Icon) => [
  {
    header: "Rank",
    accessorKey: "rank",
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <Link href={`/token/${row.original.id}`}>
        <div className="flex items-center">
          <img
            src={row.original.image}
            alt={row.original.symbol}
            className="h-6 w-6 mr-2"
          />
          <div>
            <div>{row.original.name}</div>
            <div className="text-sm text-gray-500">{row.original.symbol}</div>
          </div>
        </div>
      </Link>
    ),
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Price Change 1h",
    accessorKey: "price_change_1h",
  },
  {
    header: "Price Change 24h",
    accessorKey: "price_change_24h",
  },
  {
    header: "Volume",
    accessorKey: "volume",
  },
  {
    header: "Last update",
    accessorKey: "last_updated",
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => (
      <button
        title="Archive"
        className="text-red-600 hover:text-red-900"
        onClick={() => handleButtonClick(row.original.id)}
      >
        <Icon className="mr-1 m-r-2 h-5 w-5" />
      </button>
    ),
  },
];

export default function TokensTable({
  tokens,
  handleActionBtn,
  ActionBtnIcon,
}) {
  const columns = buildColumns(handleActionBtn, ActionBtnIcon);

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: tokens,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    key={column.id}
                    colSpan={column.colSpan}
                    onClick={column.column.getToggleSortingHandler()}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      column.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }`}
                  >
                    {flexRender(
                      column.column.columnDef.header,
                      column.getContext()
                    )}
                    {{
                      asc: " ▲",
                      desc: " ▼",
                    }[column.column.getIsSorted() as string] ?? null}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {table.getRowModel().rows.map((row, i) => {
          return (
            <tr
              key={row.id}
              className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
