import * as AWS from "aws-sdk";

export const Kinesis = new AWS.Kinesis();
export const DynamoDB = new AWS.DynamoDB();

export const StreamName = `${process.env.STAGE}-serverless-kinesis-streams`;
export const TableName = `${process.env.STAGE}-serverless-kinesis-dynamodb`;
