import { isAddress } from 'ethers/lib/utils';

export enum Chain {
  Ethereum = 1,
  Goerli = 5,
  Polygon = 137,
  Arbitrum = 42161,
  Optimism = 10,
  Avalanche = 43114,
}

export function getShortenAddress(address: string, digits = 4): string {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${address.substring(0, digits + 2)}...${address.substring(42 - digits)}`;
}

export function secondsToDhms(seconds: number) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  // console.log(d, h, m, s)
  var dDisplay = d > 0 ? d + (d == 1 ? ' day ' : ' days ') : '';
  var hDisplay = h > 0 ? h + (h == 1 ? ' hour ' : ' hours ') : '';
  var mDisplay = m > 0 ? m + (m == 1 ? ' minute ' : ' minutes ') : '';
  var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
