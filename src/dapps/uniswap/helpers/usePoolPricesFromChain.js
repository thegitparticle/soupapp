import React, { useEffect, useState } from "react";
import { getPriceUniswapV3 } from "@thanpolas/uniswap-chain-queries";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/a2d69eb319254260ab3cef34410256ca',
);

export default function usePoolPricesFromChain(
  loadingLPAddress,
  lpDetails,
  token0Address,
  token1Address,
) {
  const [loadingPoolPrices, setLoadingPoolPrices] = useState(true);
  const [token0PoolPrice, setToken0PoolPrice] = useState(null);
  const [token1PoolPrice, setToken1PoolPrice] = useState(null);

  // console.log('pool prices from chain');
  // console.log(lpDetails);
  // console.log(loadingPoolPrices);

  async function fetch() {
    const tokenPairPrice = await getPriceUniswapV3(
      lpDetails.id !== undefined || null ? lpDetails.id : '',
      // !loadingLPAddress ? lpDetails.id : '',
      // '0x290a6a7460b308ee3f19023d2d00de604bcf5b42',
      provider,
      [18, 18],
    );

    console.log(tokenPairPrice);

    if (token0Address > token1Address) {
      // console.log('0 is more');
      setToken0PoolPrice(tokenPairPrice.price);
      setToken1PoolPrice(tokenPairPrice.priceRev);
    } else {
      // console.log('1 is more');
      setToken0PoolPrice(tokenPairPrice.priceRev);
      setToken1PoolPrice(tokenPairPrice.price);
    }
  }

  useEffect(() => {
    fetch()
      // .then(r => console.log(r))
      .catch(e => console.log('pool price fetch error' + e));
  }, [lpDetails]);

  return {loadingPoolPrices, token0PoolPrice, token1PoolPrice};
}
