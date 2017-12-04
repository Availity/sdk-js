import axios from 'axios/dist/axios';

import { AvPdf } from '@availity/api-core';

class PdfApi extends AvPdf {
  constructor(options) {
    super(axios, Promise, options);
  }
}

export default new PdfApi();
