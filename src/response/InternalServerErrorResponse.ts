interface InternalServerErrorResponseType {
  data: null;
  error: string;
}

export class InternalServerErrorResponse extends Error implements InternalServerErrorResponseType {
  data: null;
  error: string;

  constructor() {
    super('Internal Server Error');
    this.data = null;
    this.error = 'Internal Server Error';
    Object.setPrototypeOf(this, InternalServerErrorResponse.prototype);
  }
}
