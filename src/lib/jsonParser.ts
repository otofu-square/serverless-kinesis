import { APIGatewayEvent } from "aws-lambda";
import { head, path, pipe } from "ramda";

import { ILineEvent, ILineEventObject } from "../models/line";

interface IParams {
  userId: string;
  type: string;
}

export const extractLineEvent: (_: APIGatewayEvent) => any = pipe(
  path(["body"]),
  JSON.parse,
  path(["events"]),
  head,
);

export const extractUserId: (_: APIGatewayEvent) => string = pipe(
  extractLineEvent,
  path(["source", "userId"]),
);

export const extractType: (_: APIGatewayEvent) => string = pipe(
  extractLineEvent,
  path(["type"]),
);

export const extractParams = (event: APIGatewayEvent) => ({
  userId: extractUserId(event),
  type: extractType(event),
});
