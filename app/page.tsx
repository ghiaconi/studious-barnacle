"use client";

import TokensTable from "components/TokensTable";
import AddTokenForm from "components/AddTokenForm";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/24/outline";
import {
  useQuery,
  useQueryClient,
  useIsFetching,
  useMutation,
} from "@tanstack/react-query";
import { Session } from "inspector";

export default function Home() {
  const queryClient = useQueryClient();

  const {
    data: tokensList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["monitored_tokens"],
    queryFn: () =>
      fetch(`http://localhost:5050/api/v1/users/app/monitored_tokens`).then(
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
    refetchInterval: 30000,
  });

  const archiveTokenMutation = useMutation({
    mutationFn: (id) =>
      fetch(
        `http://localhost:5050/api/v1/users/app/tokens/remove?token_id=${id}`,
        {
          method: "DELETE",
        }
      ).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monitored_tokens"] });
    },
  });

  const archiveToken = (id) => {
    archiveTokenMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong while getting your list</div>;
  }

  return (
    <div>
      <div className="m-3">
        <AddTokenForm />
        <TokensTable
          tokens={tokensList}
          handleActionBtn={archiveToken}
          ActionBtnIcon={ArchiveBoxArrowDownIcon}
        />
      </div>
    </div>
  );
}
