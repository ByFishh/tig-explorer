import { IsArray, IsNumber } from 'class-validator';

export class GetLastRewardsDto {
  @IsArray()
  addresses: string[];

  @IsNumber()
  length: number;
}
