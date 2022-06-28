export interface ICurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: Date;
  // chartData?: {
  //   prices: [];
  //   market_caps: [];
  //   total_volumes: [];
  // };
  chartData?: [];
}

export interface IReactButttonClick {
  e: React.MouseEvent<HTMLButtonElement>;
}

export interface IhistoricalDayProps {
  days: "1" | "30" | "90" | "365";
}
