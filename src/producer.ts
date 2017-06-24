import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { PutRecordInput, Data } from 'aws-sdk/clients/kinesis';

import { extractUserId } from './lib/jsonParser';
import { Kinesis, StreamName } from './lib/utils';

export const execute = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
): void => {
  console.log(event.body);
  const params: PutRecordInput = {
    StreamName,
    PartitionKey: extractUserId(event),
    Data: <string>event.body,
  };
  Kinesis.putRecord(params, (err: Error, data: Data) => {
    if (err) callback(err);
    console.log(data);
  });
  callback(undefined, { statusCode: 200 });
};
