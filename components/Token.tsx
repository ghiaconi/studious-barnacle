"use client";

/*
  Here we will display the tokens and the add component
  We will import 2 components:
  Token component - the individual tine item
  AddToken component - the form to add the token
*/

import React, { useState } from "react";
import Token from "@/components/TokensContainer";
import AddToken from "@/components/AddTokenToList";

const TokenDashboard = () => {
  const [tokens, setTokens] = useState([]); // IChange to use the react-query module from tanstack

  const addToken = (token) => {
    setTokens([...tokens, token]);
  };

  return (
    <div>
      {tokens.map((token, index) => (
        <Token key={index} {...token} />
      ))}
      <AddToken onAddToken={addToken} />
    </div>
  );
};

export default TokenDashboard;
