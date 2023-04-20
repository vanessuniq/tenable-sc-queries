import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenableModule } from './tenable/tenable.module';

@Module({
  imports: [TenableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
