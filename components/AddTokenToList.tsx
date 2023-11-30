import React from "react";

const AddToken = ({ onAddToken }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = {};
    onAddToken(token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Add Token</button>
    </form>
  );
};

export default AddToken;
