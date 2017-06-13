export const extractUserId = event => JSON.parse(event.body).events[0].source.userId;

export const extractParams = lineEventObject => ({
  userId: lineEventObject.events[0].source.userId,
  type: lineEventObject.events[0].type,
});
