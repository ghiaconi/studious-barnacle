"use client";

import React from "react";
import { useState } from "react";

const AddTokenForm = ({ onAddToken }) => {
  const [tokenId, setTokenId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddToken(tokenId);
    setTokenId("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 mx-auto"
    >
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        type="text"
        name="name"
        placeholder="Token id"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        value="Submit"
      >
        Add token
      </button>
    </form>
  );
};

export default AddTokenForm;
