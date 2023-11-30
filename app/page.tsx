"use client";

import Image from "next/image";
import TokenDashboard from "components/TokensTable";
import AddToken from "components/AddTokenForm";

/*
  This is the dashboard and root page.
*/

export default function Home() {
  const handleAddToken = () => {
    // handle add token logic here
  };

  return (
    <div>
      This the dashboard. here will live the tokens and the add token button.
      Will use everything client components as tokeCard and AddToken
      <AddToken onAddToken={handleAddToken} />
      <TokenDashboard />
    </div>
  );
}
