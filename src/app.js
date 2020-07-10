// THE MAIN APP
// The main loop posts simulated telemetry reading to InfluxDB every 30 minutes

const ENV_VARS = require("./appSettings");
const dbORM = require("./utils/influxDB-ORM");

let interval = ENV_VARS.APP_VARS.MESSAGE_INTERVAL_RATE_IN_MILLISECONDS;

// Global Variable to help persist data for test
var previousState = 0;

console.log("Starting application");
console.log("A random data sample that conforms to the following structure ");
console.log(ENV_VARS.initialState);
console.log(
  "and then a message will be sent " +
    ENV_VARS.APP_VARS.MESSAGE_INTERVAL_RATE_IN_MILLISECONDS +
    " miliseconds"
);

function messageDispatcher() {
  var currentAccumulatedMWhImportValue = dbORM.writeToDB(previousState);
  previousState = currentAccumulatedMWhImportValue;
}

function mainLoop() {
  // For every n time period, call the message controller.
  setInterval(messageDispatcher, interval);
}

mainLoop();
