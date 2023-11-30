"use client";

import React from "react";
import { useTable } from "@tanstack/react-table";

const Token = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Token Name",
        accessor: "name",
      },
      {
        Header: "Token Value",
        accessor: "value",
      },
      // Add more columns as needed
    ],
    []
  );

  /*
  This is responsible for taking one token component and displaying it in a table,
  it means that every row is a Token component.
  We can make use of the isPending on the useMutation() hook to show that the table is loading while addind a new token.
  So the whole table's opacity will be reduced, and the button will also be greyed out and 'adding...' will be shown on it. 
  {isPending ? "Adding..." : "Add Token"}
  {isPending && <div style={{ opacity: 0.5 }}>
  */

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Token;
