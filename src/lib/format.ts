import { formatUnits } from "viem";

export function truncateAddress(
  address?: string,
  start = 6,
  end = 4,
): string {
  if (!address) return "";
  return `${address.slice(0, start)}…${address.slice(-end)}`;
}

export function formatNativeBalance(
  value?: bigint,
  decimals = 18,
  symbol = "MON",
): string {
  if (value === undefined) return `— ${symbol}`;
  const formatted = formatUnits(value, decimals);
  const num = Number.parseFloat(formatted);
  if (Number.isNaN(num)) return `${formatted} ${symbol}`;
  if (num === 0) return `0 ${symbol}`;
  if (num < 0.0001) return `<0.0001 ${symbol}`;
  return `${num.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${symbol}`;
}
