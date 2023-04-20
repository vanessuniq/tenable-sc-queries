import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class TenableService {
  private getClient(
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
    const client = this.getClient(host, apiKey, apiSecret);
    const response = await client.get('/rest/scanResult');
    return response.data;
  }

  async getScanResult(
    host: string,
    apiKey: string,
    apiSecret: string,
    resultId: string,
  ) {
    const client = this.getClient(host, apiKey, apiSecret);
    const response = await client.get(`/rest/scanResult/${resultId}`);
    return response.data;
  }

  async getVulnerabilities(
    host: string,
    apiKey: string,
    apiSecret: string,
    resultId: string,
  ) {
    const client = this.getClient(host, apiKey, apiSecret);
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
    const response = await client.post('/rest/analysis', payload);
    return response.data;
  }
}
