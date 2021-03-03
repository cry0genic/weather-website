const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York%20?unitGroup=us&key=CH5KJT6BWGHGF79XGXTD27BRD";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        "Its is currently " + body.currentConditions.temp + " degrees outside"
      );
    }
  });
};

module.exports = forecast;
