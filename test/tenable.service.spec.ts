import { Test, TestingModule } from '@nestjs/testing';
import { TenableService } from './../src/tenable/tenable.service';

describe('TenableService', () => {
  let service: TenableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenableService],
    }).compile();

    service = module.get<TenableService>(TenableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getScanResults', () => {
    const host = 'example.com';
    const apiKey = 'test-api-key';
    const apiSecret = 'test-api-secret';
    const startTime = '2023-04-20T00:00:00.000Z';
    const endTime = '2023-04-20T23:59:59.000Z';

    it('should return an array of scan results', async () => {
      const results = await service.getScanResults(host, apiKey, apiSecret);
      expect(Array.isArray(results)).toBeTruthy();
    });

    it('should return an array of scan results within the specified time range', async () => {
      const results = await service.getScanResults(
        host,
        apiKey,
        apiSecret,
        startTime,
        endTime,
      );
      const startTimeEpoch = new Date(startTime).getTime();
      const endTimeEpoch = new Date(endTime).getTime();

      results.forEach((result) => {
        const resultTime = new Date(result.timestamp).getTime();
        expect(resultTime).toBeGreaterThanOrEqual(startTimeEpoch);
        expect(resultTime).toBeLessThanOrEqual(endTimeEpoch);
      });
    });
  });

  describe('getScanResult', () => {
    const host = 'example.com';
    const apiKey = 'test-api-key';
    const apiSecret = 'test-api-secret';
    const resultId = 'test-result-id';

    it('should return the scan result for the specified result ID', async () => {
      const result = await service.getScanResult(
        host,
        apiKey,
        apiSecret,
        resultId,
      );
      expect(result).toBeDefined();
      expect(result.id).toEqual(resultId);
    });
  });

  describe('getVulnerabilities', () => {
    const host = 'example.com';
    const apiKey = 'test-api-key';
    const apiSecret = 'test-api-secret';
    const resultId = 'test-result-id';

    it('should return an array of vulnerabilities for the specified scan result ID', async () => {
      const vulnerabilities = await service.getVulnerabilities(
        host,
        apiKey,
        apiSecret,
        resultId,
      );
      expect(Array.isArray(vulnerabilities)).toBeTruthy();
      vulnerabilities.forEach((vulnerability) => {
        expect(vulnerability.scanId).toEqual(resultId);
      });
    });
  });
});
