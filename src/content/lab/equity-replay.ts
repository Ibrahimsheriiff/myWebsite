export type ReplayScenario = 'success' | 'provider' | 'invalid';
export const replayScenarios: [ReplayScenario, string][] = [
  ['success', 'Prepared success'],
  ['provider', 'Provider returns an error'],
  ['invalid', 'Request missing a ticker'],
];
export const fictionalPrice = {
  ticker: 'FICT',
  current_price: 99.5,
  previous_close: 100,
  day_change_pct: ((99.5 - 100) / 100) * 100,
  volume: 12000,
  avg_volume_10d: 11000,
  beta: 1,
  volatility_30d_annualised_pct: 12,
  '52w_high': 110,
  '52w_low': 80,
};
export type ReplayEvent = {
  index: number;
  stage: string;
  title: string;
  note: string;
  payload: unknown;
  outcome?: 'passed' | 'failed';
  extension?: boolean;
};
