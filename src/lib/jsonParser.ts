import { WebhookEvent } from "@line/bot-sdk";
import { APIGatewayEvent } from "aws-lambda";
import { head, pathOr, pipe } from "ramda";

interface IParams {
  userId: string;
  type: string;
}

export const extractLineEvent = pipe<
  APIGatewayEvent,
  string,
  APIGatewayEvent["body"],
  WebhookEvent[],
  WebhookEvent
>(pathOr("", ["body"]), JSON.parse, pathOr("", ["events"]), head);

export const extractUserId = pipe<APIGatewayEvent, WebhookEvent, string>(
  extractLineEvent,
  pathOr("", ["source", "userId"]),
);

export const extractType = pipe<APIGatewayEvent, WebhookEvent, string>(
  extractLineEvent,
  pathOr("", ["type"]),
);

export const extractParams = (event: APIGatewayEvent) => ({
  userId: extractUserId(event),
  type: extractType(event),
});
