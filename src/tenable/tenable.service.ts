import { Injectable, HttpException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class TenableService {
  private getApiClient(
    host: string,
    apiKey: string,
    apiSecret: string,
  ): AxiosInstance {
    return axios.create({
      baseURL: `https://${host}`,
      headers: {
        'Content-Type': 'application/json',
        'x-apikey': `accesskey=${apiKey}; secretkey=${apiSecret}`,
      },
    });
  }

  async getScanResults(host: string, apiKey: string, apiSecret: string) {
    try {
      const response = await this.getApiClient(host, apiKey, apiSecret).get(
        '/rest/scanResult',
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async getScanResult(
    host: string,
    apiKey: string,
    apiSecret: string,
    resultId: string,
  ) {
    try {
      const response = await this.getApiClient(host, apiKey, apiSecret).get(
        `/rest/scanResult/${resultId}`,
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async getVulnerabilities(
    host: string,
    apiKey: string,
    apiSecret: string,
    resultId: string,
  ) {
    try {
      const payload = {
        type: 'vuln',
        sourceType: 'individual',
        scanID: resultId,
        sortField: 'severity',
        sortDir: 'desc',
        view: 'all',
        query: {
          tool: 'vulndetails',
          type: 'vuln',
          startOffset: 0,
          endOffset: 9999,
        },
      };
      const response = await this.getApiClient(host, apiKey, apiSecret).post(
        `/rest/analysis`,
        payload,
      );
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
