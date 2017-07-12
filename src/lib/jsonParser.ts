import { APIGatewayEvent } from 'aws-lambda';

export const extractUserId = (event: APIGatewayEvent) =>
  JSON.parse(event.body as string).events[0].source.userId;

interface LineEvent {
  source: {
    userId: string;
  };
  type: string;
}

interface LineEventObject {
  events: LineEvent[];
}

interface Params {
  userId: string;
  type: string;
}

export const extractParams = (lineEventObject: LineEventObject): Params => ({
  userId: lineEventObject.events[0].source.userId,
  type: lineEventObject.events[0].type,
});
