import { IsArray, IsNumber } from 'class-validator';

export class GetBlockRewardsDto {
  @IsArray()
  addresses: string[];

  @IsNumber()
  length: number;
}
