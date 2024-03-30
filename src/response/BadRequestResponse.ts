interface BadRequestResponseType {
  data: null;
  error: string;
}

export class BadRequestResponse extends Error implements BadRequestResponseType {
  data: null;
  error: string;

  constructor(errorMessage = 'Bad request') {
    super(errorMessage);
    this.data = null;
    this.error = errorMessage;
    Object.setPrototypeOf(this, BadRequestResponse.prototype);
  }
}
