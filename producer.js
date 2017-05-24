"use strict";

module.exports.execute = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "This is producer",
      input: event
    })
  };

  callback(null, response);
};
