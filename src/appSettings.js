//influxdbcom.readthedocs.io/en/latest/content/docs/v0.7/api/reading_and_writing_data/

// INFLUX DB DATA STRUCTURE REQUIREMENT
/*
    "name" : "DEVICEGUID",                                                           // ROW NAME
    "columns" : ["date-time-UTC", "kWh-exported", "ambient-temperature-celcius"],    // DATA POINT NAMES
    "points" : [                                                                     // DATA POINT VALUES
      ["12-11-1985-T13:40", 57, 32]
    ]
*/

// BUT SINCE NODE-INFLUX LIBRARY IS HANDLING THE HTTP POST TO THE DB
/*
From Node-Influx Library
node-influx.github.io/manual/tutorial.html#express-response-times-example
measurement = table name
fields = column name
tags = similar to type of field, but optimised for search
/*

*/

exports.initialState = [
  {
    measurement: "SmartGateControllerMeasurements",
    tags: { deviceGUID: "DEVICE_GUID" },
    fields: {
      timeDateUTC: "12-11-1985-T13:40",
      ambientTempInC: 23,
      accumulatedKwH: 55,
    },
  },
];

exports.APP_VARS = {
  MESSAGE_INTERVAL_RATE_IN_MILLISECONDS: 1000 * 60 * 60 * 30, //SEND MESSAGE EVERY Send message every 30 minutes
};
