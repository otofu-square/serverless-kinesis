export const extractUserId = event => JSON.parse(event.body).events[0].source.userId;

interface LineEventObject {
  events: [
    {
      source: {
        userId: string;
      };
      type: string;
    }
  ];
}

interface Params {
  userId: string;
  type: string;
}

export const extractParams = (lineEventObject: LineEventObject): Params => ({
  userId: lineEventObject.events[0].source.userId,
  type: lineEventObject.events[0].type,
});
