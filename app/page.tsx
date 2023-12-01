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
    queryKey: ["tokens"],
    queryFn: () =>
      fetch("http://localhost:5050/api/v1/tokens?username=app").then((res) =>
        res.json()
      ),
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
    mutationFn: (id) =>
      fetch(
        `http://localhost:5050/api/v1/users/app/tokens/add?token_id=${id}`,
        {
          //method: "DELETE",
          method: "POST",
        }
      ).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tokens"] });
    },
  });

  const archiveToken = (id) => {
    mutation.mutate(id);
  };

  const addToken = (id) => {
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
      <div className="m-3">
        <AddTokenForm onAddToken={addToken} />
        <TokensTable
          tokens={tokensList}
          handleActionBtn={archiveToken}
          ActionBtnIcon={ArchiveBoxArrowDownIcon}
        />
      </div>
    </div>
  );
}
