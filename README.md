# Cocomail NodeJS Library

NodeJS library for integrating with the [Cocomail](https://cocomail.io) API



### API Documentation
[API Documentation](https://docs.cocomail.io/api-docs/introduction)

## Getting Started


* ### Create an API key
Create an API key under the [Account Section](https://app.cocomail.io/account) of the app and find the API Keys section. 

The API key should have the access control `events_trigger_access`

* ### Create an event
Create an API key under the [Event Section](https://app.cocomail.io/events) of the app and copy the `identifier` field which will be used in the next step.

* ### Triggering an event
Instantiate a new instance of Cocomail and provide the API key created earlier.

```jsx
const cocoClient = new Cocomail(process.env.COCOMAIL_API_KEY);

const identifier = 'SIGNUP'
const response = await cocoClient.triggerEvent({
  identifier: identifier,
  email: email
});
```

### Required fields
`email`

The email of the contact that triggered the event - If a contact with the email does not already exist it will be created

`identifier`

The identifier of the event to trigger. 

Events can be created under the [Events](https://app.cocomail.io/events) tab of the dashboard.


### Optional fields
`consentsToEmails`

Default value: *true*

If the created contact consents to receive emails or not

```jsx
const cocoClient = new Cocomail(process.env.COCOMAIL_API_KEY);

const identifier = 'SIGNUP';
const userReceivesToMarketingEmails = true;

const response = await cocoClient.triggerEvent({
  identifier: identifier,
  email: email,
  consentsToEmails: userReceivesToMarketingEmails
});
```

___

`contactMetadata`

Default value: `empty object`

Metadata that should be added to the contact when the event is triggered. If the field already exists on the contact it will be updated with the new values. 

```jsx
const cocoClient = new Cocomail(process.env.COCOMAIL_API_KEY);

const identifier = 'SIGNUP'
const response = await cocoClient.triggerEvent({
  identifier: identifier,
  email: email,
  contactMetadata: {
    signed_up_at = new Date().toString();
  }
});
```

___

`triggerMetadata`

Default value: `empty object`

Metadata that should only be used for the duration of the request and in subsequent [Automations](https://app.cocomail.io/cocos) triggered by the event. 

The `forgot_password_link` field in the request will be substituted with the `{{forgot_password_link}}` template variable in the [Email Template](https://app.cocomail.io/email-templates)

```jsx
const cocoClient = new Cocomail(process.env.COCOMAIL_API_KEY);

const identifier = 'FORGOT_PASSWORD'
const response = await cocoClient.triggerEvent({
  identifier: identifier,
  email: email,
  triggerMetadata: {
    forgot_password_link = "https://app-url.com/forgot-password/unique-password-reset-link"
  }
});
```
    
## Example Response

```jsx
{
  "data":{
    "contact":{
        "id":"018e32c3-4fd6-71cb-9425-ebd7f8ac09d2",
        "email":"user@example.com",
        "metadata":{
          "forgot_password_at":"2024-03-18T10:25:00.000Z"
        },
        "createdAt":"2024-03-12T13:04:04.566Z"
    },
    "event":{
        "id":"018e50e3-5b19-734e-ab70-4909b83426ec",
        "name":"Forgot Password",
        "identifier":"FORGOT_PASSWORD",
        "createdAt":"2024-03-18T09:27:41.000Z"
    },
    "trigger":{
        "metadata":{
          "forgot_password_link":"https://app-url.com/forgot-password/unique-password-reset-page"
        }
    }
  },
  "error":null
}
```

## Example Error Response
```jsx
{
  "data": null,
  "error": "Event with identifier INVALID_EVENT_IDENTIFIER not found"
}

```
