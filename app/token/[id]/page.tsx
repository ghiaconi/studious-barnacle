import React from "react";
import axios from "axios";
import Image from "next/image";

const getToken = async (tokenId: string) => {
  try {
    const response = await axios.get(
      `${process.env.COIN_MAPI_BASE_URL}/tokens/${tokenId}`
    );

    return response.data.data.data;
  } catch (error) {
    console.error(`Error getting token with ID ${tokenId}:`, error);
    return { error: `Token not found...` };
  }
};

export default async function Token({ params }: { params: { id: string } }) {
  const id = params.id;
  const token = await getToken(id);

  if (token.error) {
    return <p>Something went wrong!</p>;
  }

  const { name, image, market_data } = token;
  const {
    current_price,
    market_cap,
    high_24h,
    low_24h,
    price_change_percentage_24h,
  } = market_data;
  const last_updated = new Date(token.last_updated).toLocaleString();
  const priceChangeClass =
    parseFloat(price_change_percentage_24h) < 0
      ? "text-red-500"
      : "text-green-500";

  const marketCapRank = token && token.market_cap_rank.toLocaleString();
  const rankColor =
    token.market_cap_rank < 10 ? "bg-green-500" : "bg-orange-500";
  const alt = "/placeholder.png";
  const price_change = market_data.market_cap_change_percentage_24h;

  return (
    <div className=" p-8 text-gray-700" key={token.id}>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="mb-4 lg:mb-0 basis-2/3">
          <p
            className={`py-1 px-2 ${rankColor} text-white rounded-lg inline-block`}
          >
            Rank # {marketCapRank}
          </p>
          <div className="flex items-center">
            <Image
              src={token.image.small || alt}
              alt="coin image"
              width={40}
              height={40}
              className="mr-2"
            ></Image>
            <h2 className="py-2 text-2xl text-black font-bold">
              {token.name}
              <span className=" px-2 text-base font-light text-neutral-400">
                {token.symbol}
              </span>
            </h2>
          </div>
          <p className="py-3 text-xl text-black font-bold">
            € {current_price.eur.toLocaleString()}
            <span
              className={`font-semibold py-2 ml-2 text-sm ${priceChangeClass}`}
            >
              {price_change_percentage_24h.toFixed(1)}%
            </span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ul className="py-1">
              <li>
                <span className="font-semibold py-2 mr-5">Last updated:</span>
                {last_updated}
              </li>
              <li>
                <span className="font-semibold py-2 mr-5">Market Cap: </span> €
                {market_cap.eur.toLocaleString()}
              </li>
              <li>
                <span className="font-semibold py-2 mr-5">
                  Circulating Supply:
                </span>
                €{token.market_data.circulating_supply.toLocaleString()}
              </li>
            </ul>
            <ul className="py-1">
              <li>
                <span className="font-semibold py-2 mr-5">Maximum Supply:</span>
                €{token.market_data.max_supply?.toLocaleString() || "N/A"}
              </li>
              <li>
                <span className="font-semibold py-2 mr-5">Total Supply:</span> €
                {token.market_data.total_supply.toLocaleString()}
              </li>
              <li>
                <span className="font-semibold py-2 mr-5">Total Volume:</span> €
                {token.market_data.total_volume.eur.toLocaleString()}
              </li>
            </ul>
          </div>
        </div>

        <div className="basis-1/3">
          <ul className="py-3">
            <li className="py-1">
              <span className="font-semibold mr-5">Liquidity Score:</span>
              {token.liquidity_score}%
            </li>
            <li className="py-1">
              <span className="font-semibold mr-5">Community Score:</span>
              {token.community_score}%
            </li>
            <li className="py-1">
              <span className="font-semibold mr-5">Website</span>
              <span className="font-semibold mr-5 text-blue-400">
                <a
                  href={token.links.homepage[0]}
                  className="mr-5 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {token.links.homepage[0]}
                </a>
              </span>
            </li>
            <li className="py-1">
              <span className="font-semibold mr-5">Public Interest Score:</span>
              {token.public_interest_score.toFixed(1)}%
            </li>
          </ul>
        </div>
      </div>
      <div className="py-5 ">
        <h3 className="text-xl font-bold py-3">About</h3>
        <p className="">{token.description.en}</p>
      </div>
    </div>
  );
}
