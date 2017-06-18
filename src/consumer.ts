import { registUnfollowedState, removeUnfollowedState } from './lib/dynamodb';
import { extractParams } from './lib/jsonParser';

export const execute = (event, context, callback): void => {
  event.Records.forEach(record => {
    const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
    console.log('Decoded payload:', payload);

    const lineEventObject = JSON.parse(payload);
    const { userId, type } = extractParams(lineEventObject);

    // see: https://devdocs.line.me/ja/#unfollow-event
    if (type === 'unfollow') registUnfollowedState(userId);

    // see: https://devdocs.line.me/ja/#follow-event
    if (type === 'follow') removeUnfollowedState(userId);
  });
  callback(null, { statusCode: 200 });
};
