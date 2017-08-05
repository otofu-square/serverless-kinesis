import { Callback, Context } from "aws-lambda";
import { ListStreamsOutput, RecordList } from "aws-sdk/clients/kinesis";

import { registUnfollowedState, removeUnfollowedState } from "./lib/dynamodb";
import { extractParams } from "./lib/jsonParser";

export const execute = (
  // TODO: Change any type
  event: any,
  context: Context,
  callback: Callback,
): void => {
  // TODO: Change any type
  event.Records.forEach((record: any) => {
    const payload = new Buffer(record.kinesis.data, "base64").toString("ascii");
    console.log("Decoded payload:", payload);
    const { userId, type } = extractParams(JSON.parse(payload));

    // see: https://devdocs.line.me/ja/#unfollow-event
    if (type === "unfollow") registUnfollowedState(userId);

    // see: https://devdocs.line.me/ja/#follow-event
    if (type === "follow") removeUnfollowedState(userId);
  });
  callback(undefined, { statusCode: 200 });
};
