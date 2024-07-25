import { Module } from '@nestjs/common';
import { NodeModule } from './node/node.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoundEntity } from './entities/round.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { BlockRewardEntity } from './entities/block-reward.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [RoundEntity, BlockRewardEntity],
        synchronize: true,
      }),
    }),
    NodeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
