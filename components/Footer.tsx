import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white text-center py-4">
      <div className="container mx-auto flex items-center justify-center">
        <span>Data provided by CoinGecko.</span>
        <Link href="https://www.coingecko.com/en/api">
          <Image
            src="/coingecko.svg"
            alt="CoinGecko"
            width={30}
            height={30}
            className="ml-2"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
