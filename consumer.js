"use strict";

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();

const TableName = "dev-serverless-kinesis-dynamodb";

const extractParams = lineEventObject => ({
  userId: lineEventObject.events[0].source.userId,
  type: lineEventObject.events[0].type
});

const registUnfollowedState = userId => {
  const params = {
    TableName: TableName,
    Item: {
      id: { S: userId }
    }
  };

  dynamodb.putItem(params, (err, data) => {
    if (err) callback(err);
    console.log(`Unfollowed by userId: ${userId}`);
  });
};

const removeUnfollowedState = userId => {
  const params = {
    TableName: TableName,
    Key: {
      id: { S: userId }
    }
  };

  dynamodb.deleteItem(params, (err, data) => {
    if (err) callback(err);
    console.log(`Followed by userId: ${userId}`);
  });
};

module.exports.execute = (event, context, callback) => {
  event.Records.forEach(record => {
    const payload = new Buffer(record.kinesis.data, "base64").toString("ascii");
    console.log("Decoded payload:", payload);

    const lineEventObject = JSON.parse(payload);
    const { userId, type } = extractParams(lineEventObject);

    // see: https://devdocs.line.me/ja/#unfollow-event
    if (type === "unfollow") registUnfollowedState(userId);

    // see: https://devdocs.line.me/ja/#follow-event
    if (type === "follow") removeUnfollowedState(userId);
  });
  callback(null, { statusCode: 200 });
};
