import { Module } from '@nestjs/common';
import { TenableService } from './tenable.service';
import { TenableController } from './tenable.controller';

@Module({
  providers: [TenableService],
  controllers: [TenableController],
})
export class TenableModule {}
