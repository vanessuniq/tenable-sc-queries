import {
  Controller,
  Get,
  Query,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TenableService } from './tenable.service';
import { TenableCredentialsDto } from './dto/tenable-credentials.dto';

@Controller('tenable')
export class TenableController {
  constructor(private readonly tenableService: TenableService) {}

  @Get('scan-results')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getScanResults(@Query() credentials: TenableCredentialsDto) {
    return this.tenableService.getScanResults(
      credentials.host,
      credentials.apiKey,
      credentials.apiSecret,
    );
  }

  @Get('scan-results/:resultId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getScanResult(
    @Query() credentials: TenableCredentialsDto,
    @Param('resultId') resultId: string,
  ) {
    return this.tenableService.getScanResult(
      credentials.host,
      credentials.apiKey,
      credentials.apiSecret,
      resultId,
    );
  }

  @Get('vulnerabilities/:resultId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getVulnerabilities(
    @Query() credentials: TenableCredentialsDto,
    @Param('resultId') resultId: string,
  ) {
    return this.tenableService.getVulnerabilities(
      credentials.host,
      credentials.apiKey,
      credentials.apiSecret,
      resultId,
    );
  }
}
