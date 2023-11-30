// as this is the root page, it is a server component.
import Image from "next/image";
import TokenDashboard from "@/components/Token";

export default function Home() {
  return (
    <div>
      This the dashboard. here will live the tokens and the add token button.
      This is a server component that will use client components as tokeCard and
      AddToken
      <TokenDashboard />
    </div>
  );
}
