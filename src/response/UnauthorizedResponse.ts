interface UnauthorizedResponseType {
  data: null;
  error: string;
}

export class UnauthorizedResponse extends Error implements UnauthorizedResponseType {
  data: null;
  error: string;

  constructor() {
    super('Invalid API Key');
    this.data = null;
    this.error = 'Invalid API Key';
    Object.setPrototypeOf(this, UnauthorizedResponse.prototype);
  }
}
