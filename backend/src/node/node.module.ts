import { Module } from '@nestjs/common';
import { NodeController } from './node.controller';
import { NodeService } from './node.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoundEntity } from '../entities/round.entity';
import { BlockRewardEntity } from '../entities/block-reward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoundEntity, BlockRewardEntity])],
  controllers: [NodeController],
  providers: [NodeService],
})
export class NodeModule {}
