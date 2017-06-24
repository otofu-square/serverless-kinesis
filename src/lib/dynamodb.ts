import { PutItemInput, DeleteItemInput } from 'aws-sdk/clients/dynamodb';

import { DynamoDB, TableName } from './utils';

export const registUnfollowedState = (userId: string): void => {
  const params: PutItemInput = {
    TableName,
    Item: {
      id: { S: userId },
    },
  };

  DynamoDB.putItem(params, (err: Error) => {
    if (err) console.log(err);
    console.log(`Unfollowed by userId: ${userId}`);
  });
};

export const removeUnfollowedState = (userId: string): void => {
  const params: DeleteItemInput = {
    TableName,
    Key: {
      id: { S: userId },
    },
  };

  DynamoDB.deleteItem(params, (err: Error) => {
    if (err) console.log(err);
    console.log(`Followed by userId: ${userId}`);
  });
};
