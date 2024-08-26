import { IsArray } from 'class-validator';

export class GetLastRewardsRequestDto {
  @IsArray()
  addresses: string[];
}
