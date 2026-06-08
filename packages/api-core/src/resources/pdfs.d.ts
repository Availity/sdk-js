import AvApi, { AvApiConfig, RequestConfig, AvApiResponse } from '../api';

export interface PdfData {
  applicationId: string;
  fileName: string;
  html: string;
  [key: string]: unknown;
}

export default class AvPdfs extends AvApi {
  constructor(config: AvApiConfig & { http: (config: RequestConfig) => Promise<AvApiResponse> });

  onPdf(response: AvApiResponse<{ links: { pdf: { href: string } } }>): void;

  getPdf(data: PdfData, config?: Partial<AvApiConfig>): Promise<void>;
}
