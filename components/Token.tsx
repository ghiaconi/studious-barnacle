
import React from 'react';

interface TokenProps {
  name: string;
  symbol: string;
  price: number;
}

const Token: React.FC<TokenProps> = ({ name, symbol, price }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Symbol: {symbol}</p>
      <p>Price: ${price}</p>
    </div>
  );
};

export default Token;
