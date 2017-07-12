import { APIGatewayEvent } from 'aws-lambda';

import { LineEvent, LineEventObject } from './models/line';

interface Params {
  userId: string;
  type: string;
}

export const extractUserId = (event: APIGatewayEvent) =>
  JSON.parse(event.body as string).events[0].source.userId;

export const extractParams = (lineEventObject: LineEventObject): Params => ({
  userId: lineEventObject.events[0].source.userId,
  type: lineEventObject.events[0].type,
});
