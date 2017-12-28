import AvApi from '../api';

export default class AvPdfs extends AvApi {
  constructor(http, promise, config = {}) {
    const options = Object.assign(
      {
        path: 'api/utils',
        name: 'pdfs',
      },
      config
    );
    super(http, promise, options);
  }

  onPdf(response) {
    window.location = response.data.pdf.href;
  }

  getPdf(data, config) {
    if (!data.applicationId || !data.fileName || !data.html) {
      throw new Error('[applicationId], [fileName] and [html] must be defined');
    }

    return this.post(data, config).then(this.onPdf);
  }
}
