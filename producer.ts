import * as AWS from 'aws-sdk';
import { extractUserId } from './lib/jsonParser';

const kinesis = new AWS.Kinesis();

const StreamName = `${process.env.STAGE}-serverless-kinesis-streams`;

export const execute = (event, context, callback) => {
  console.log(event.body);

  const params = {
    StreamName,
    PartitionKey: extractUserId(event),
    Data: event.body,
  };

  kinesis.putRecord(params, (err, data) => {
    if (err) callback(err);
    console.log(data);
  });

  callback(null, { statusCode: 200 });
};
