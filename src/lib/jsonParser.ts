import { APIGatewayEvent } from 'aws-lambda';

export const extractUserId = (event: APIGatewayEvent) =>
  JSON.parse(<string>event.body).events[0].source.userId;

interface LineEventObject {
  events: [
    {
      source: {
        userId: string;
      };
      type: string;
    }
  ];
}

interface Params {
  userId: string;
  type: string;
}

export const extractParams = (lineEventObject: LineEventObject): Params => ({
  userId: lineEventObject.events[0].source.userId,
  type: lineEventObject.events[0].type,
});
