import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { Data, PutRecordInput } from "aws-sdk/clients/kinesis";

import { extractUserId } from "./lib/jsonParser";
import { Kinesis, StreamName } from "./lib/utils";

export const execute = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
): void => {
  const params: PutRecordInput = {
    StreamName,
    PartitionKey: extractUserId(event),
    Data: event.body as string,
  };
  Kinesis.putRecord(params, (err: Error, data: Data) => {
    if (err) callback(err);
    console.log(data);
  });
  callback(undefined, { statusCode: 200 });
};
