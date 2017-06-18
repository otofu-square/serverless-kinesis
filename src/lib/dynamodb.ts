import * as AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB();

const TableName = `${process.env.STAGE}-serverless-kinesis-dynamodb`;

export const registUnfollowedState = (userId: string): void => {
  const params = {
    TableName,
    Item: {
      id: { S: userId },
    },
  };

  dynamodb.putItem(params, err => {
    if (err) console.log(err);
    console.log(`Unfollowed by userId: ${userId}`);
  });
};

export const removeUnfollowedState = (userId: string): void => {
  const params = {
    TableName,
    Key: {
      id: { S: userId },
    },
  };

  dynamodb.deleteItem(params, err => {
    if (err) console.log(err);
    console.log(`Followed by userId: ${userId}`);
  });
};
