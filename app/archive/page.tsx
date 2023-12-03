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
    queryKey: ["archived_tokens"],
    queryFn: () =>
      fetch(`http://localhost:5050/api/v1/users/app/archived_tokens`).then(
        (res) => res.json()
      ),
    select: ({ data }) => {
      return data.map((item) => ({
        id: item.data.id,
        symbol: item.data.symbol,
        name: item.data.name,
        image: item.data.image,
        rank: item.data.market_cap_rank,
        price: item.data.current_price,
        price_change_1h: item.data.price_change_percentage_1h_in_currency,
        price_change_24h: item.data.price_change_percentage_24h_in_currency,
        volume: item.data.total_volume,
        last_updated: item.data.last_updated,
      }));
    },
  });

  const mutation = useMutation({
    mutationFn: (id) =>
      fetch(
        `http://localhost:5050/api/v1/users/app/tokens/add?token_id=${id}`,
        {
          method: "POST",
        }
      ).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["archived_tokens"] });
    },
  });

  const enableToken = (id) => {
    mutation.mutate(id);
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
