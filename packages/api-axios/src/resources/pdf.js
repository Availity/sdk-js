import AvApi from '../api';

export default class AvPdfApi extends AvApi {
  constructor(config) {
    super({
      path: 'api/utils',
      name: 'pdfs',
      ...config,
    });
  }

  onPdf(response) {
    window.location = response.data.links.pdf.href;
  }

  async getPdf(data, config) {
    if (!data.applicationId || !data.fileName || !data.html) {
      throw new Error('[applicationId], [fileName] and [html] must be defined');
    }

    const response = await this.post(data, config);
    this.onPdf(response);

    return response;
  }
}

export const avPdfApi = new AvPdfApi();
