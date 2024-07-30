import { IsArray, IsNumber } from 'class-validator';

export class GetEntireNodeDto {
  address: string;

  @IsNumber()
  length: number;
}
