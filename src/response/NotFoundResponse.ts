interface NotFoundResponseType {
  data: null;
  error: string;
}

export class NotFoundResponse extends Error implements NotFoundResponseType {
  data: null;
  error: string;

  constructor(errorMessage = 'Not found') {
    super(errorMessage);
    this.data = null;
    this.error = errorMessage;
    Object.setPrototypeOf(this, NotFoundResponse.prototype);
  }
}
