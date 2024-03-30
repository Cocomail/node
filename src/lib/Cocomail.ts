import { BadRequestResponse } from "../response/BadRequestResponse";
import { InternalServerErrorResponse } from "../response/InternalServerErrorResponse";
import { NotFoundResponse } from "../response/NotFoundResponse";
import { UnauthorizedResponse } from "../response/UnauthorizedResponse";

interface TriggerEventRequest {
  email: string;
  identifier: string;
  consentsToEmails?: boolean;
  contactMetadata?: Record<string, string>;
  triggerMetadata?: Record<string, string>;
}

export class Cocomail {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async triggerEvent<T>(request: TriggerEventRequest): Promise<T> {
    const apiUrl = `https://api.cocomail.io/events/trigger`;

    const requestBody: TriggerEventRequest = {
      email: request.email,
      identifier: request.identifier,
      consentsToEmails: request.consentsToEmails ?? true,
      contactMetadata: request.contactMetadata ?? {},
      triggerMetadata: request.triggerMetadata ?? {},
    };
		
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorMessage = (await response.json()).error;
      switch (response.status) {
        case 400:
          throw new BadRequestResponse(errorMessage);
        case 401:
          throw new UnauthorizedResponse();
        case 404:
          throw new NotFoundResponse(errorMessage);
        case 500:
          throw new InternalServerErrorResponse();
        default:
          throw new Error('Unexpected error occurred');
      }
    }
    
    return await response.json();
  }
}