const AWS = require('aws-sdk');

const kinesis = new AWS.Kinesis();

const StreamName = 'dev-serverless-kinesis-streams';

const extractUserId = event => JSON.parse(event.body).events[0].source.userId;

// eslint-disable-next-line immutable/no-mutation
module.exports.execute = (event, context, callback) => {
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
