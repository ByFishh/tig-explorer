import { IsArray } from 'class-validator';

export class GetLastRewardsDto {
  @IsArray()
  addresses: string[];
}
