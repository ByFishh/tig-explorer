import { Controller, Get, Param } from '@nestjs/common';
import { BenchmarkersService } from '../../services/benchmarkers/benchmarkers.service';
import { ParseAddressPipe } from './parse-address.pipe';

@Controller('benchmarker')
export class BenchmarkersController {
  constructor(private benchmarkService: BenchmarkersService) {}

  @Get(':address')
  async getBenchmarker(
    @Param('address', new ParseAddressPipe()) address: string,
  ) {
    return await this.benchmarkService.getBenchmarker(address);
  }

  @Get(':address/preview')
  async getBenchmarkerPreview(
    @Param('address', new ParseAddressPipe()) address: string,
  ) {
    return await this.benchmarkService.getBenchmarkerPreview(address);
  }
}
