"use client";

import TokensTable from "components/TokensTable";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export default function Home() {
  const queryClient = useQueryClient();

  const {
    data: tokensList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tokens"],
    queryFn: () =>
      fetch("http://localhost:5050/api/v1/tokens").then((res) => res.json()),
    select: ({ data }) => {
      return data.map((item) => ({
        id: item.data.id,
        symbol: item.data.symbol,
        name: item.data.name,
        image: item.data.image.thumb,
        rank: item.data.market_cap_rank,
        price: item.data.market_data.current_price.eur,
        price_change_1h:
          item.data.market_data.price_change_percentage_1h_in_currency.eur,
        price_change_24h:
          item.data.market_data.price_change_percentage_24h_in_currency.eur,
        volume: item.data.market_data.total_volume.eur,
        last_updated: item.data.last_updated,
      }));
    },
  });

  const mutation = useMutation({
    mutationFn: () =>
      fetch("http://localhost:5050/api/v1/tokens", { method: "POST" }).then(
        (res) => res.json()
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tokens"] });
    },
  });

  const enableToken = (id) => {
    console.log("enableToken", id);
    mutation.mutate();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong while getting your list</div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-start">
        <TokensTable
          tokens={tokensList}
          handleActionBtn={enableToken}
          ActionBtnIcon={FolderPlusIcon}
        />
      </div>
    </div>
  );
}
