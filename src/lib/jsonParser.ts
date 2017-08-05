import { APIGatewayEvent } from "aws-lambda";

import { ILineEvent, ILineEventObject } from "./models/line";

interface IParams {
  userId: string;
  type: string;
}

export const extractUserId = (event: APIGatewayEvent) =>
  JSON.parse(event.body as string).events[0].source.userId;

export const extractParams = (lineEventObject: ILineEventObject): IParams => ({
  userId: lineEventObject.events[0].source.userId,
  type: lineEventObject.events[0].type,
});
