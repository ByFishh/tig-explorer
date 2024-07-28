export class GetLastRewardsDto {
  addresses: string[];
  timeframe: 'minute' | 'hour' | 'day';
}
