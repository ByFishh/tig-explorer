import { IsArray, IsNumber } from 'class-validator';

export class GetBlockRewardsRequestDto {
  @IsArray()
  addresses: string[];

  @IsNumber()
  length: number;
}
