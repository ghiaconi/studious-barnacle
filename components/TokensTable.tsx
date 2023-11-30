"use client";

/*
  Here we will display the tokens table, it is just one component]
  Each row will have also a button to archive the token
*/

import React, { useState } from "react";
import { useReactTable } from "@tanstack/react-table";

const TokenDashboard = () => {
  const table = useReactTable({});
  const [tokens, setTokens] = useState([]); // IChange to use the react-query module from tanstack

  const addToken = (token) => {
    setTokens([...tokens, token]);
  };

  return (
    <div>
      {tokens.map((token, index) => (
        <Token key={index} {...token} />
      ))}
    </div>
  );
};

export default TokenDashboard;
