const moment = require("moment");
const Influx = require("influx");
const APPSECRETS = require("./../secrets");

/*
Conceptually you can think of a measurement as an SQL table, where the primary index is always time.
Tags and fields are effectively columns in the table. 
Tags are indexed, and fields are not. 
The difference is that, with InfluxDB, you can have millions of measurements, 
you don’t have to define schemas up-front, and null values aren’t stored.
*/

const influx = new Influx.InfluxDB({
  host: APPSECRETS.SECRETS.HOST,
  port: APPSECRETS.SECRETS.PORT,
  username: APPSECRETS.SECRETS.DB_USRNAME,
  password: APPSECRETS.SECRETS.DB_PWORD,
  database: APPSECRETS.SECRETS.DB_NAME,
  schema: [
    {
      measurement: APPSECRETS.SECRETS.DB_TABLENAME,
      fields: {
        timeDateUTC: Influx.FieldType.STRING,
        ambientTempInC: Influx.FieldType.STRING,
        accumulatedKwH: Influx.FieldType.INTEGER,
      },
      tags: ["deviceGUID"],
    },
  ],
});

// /////////////////////////////////////
//
// PUBLIC METHOD writeToDB
// Recieves a message from the messageDispatcher ./../app.js
// Existing message with the running total of energyImport to keep track of
// Creates a new message using random number generator
// Posts the new message to the InfluxDB instance
// Returns new message to the messageDispatcher
// so that it can keep track of running total
//
//
// @Param { JSON Object within array [{key:val}] } - Previous Message
// @Return { JSON Object within array [{key:val}] } - New message
exports.writeToDB = (previousEnergyImport) => {
  let dateTimeUTC = moment.utc().format();
  let FIRSTrandomNumber1to100 = Math.floor(Math.random() * 30 + 1) + 1;
  let SECONDrandomNumber1to100 = Math.floor(Math.random() * 100 + 1);

  let accumulatedEnergyImport = previousEnergyImport + SECONDrandomNumber1to100;

  influx.writePoints([
    {
      measurement: APPSECRETS.SECRETS.DB_TABLENAME,
      tags: { deviceGUID: APPSECRETS.SECRETS.DEVICE_GUID },
      fields: {
        timeDateUTC: dateTimeUTC,
        ambientTempInC: FIRSTrandomNumber1to100,
        accumulatedKwH: accumulatedEnergyImport,
      },
    },
  ]);
  //  FOR TESTING - UNCOMMENT TO SEE THE RESULTS -- QUERY THE DATABASE
  //
  //   .then(() => {
  //     return influx.query(`
  //   select * from ${APPSECRETS.SECRETS.DB_TABLENAME}
  //   where deviceGUID = ${Influx.escape.stringLit(
  //     APPSECRETS.SECRETS.DEVICE_GUID
  //   )}
  //   order by time desc
  //   limit 10
  // `);
  //   })
  //   .then((rows) => {
  //     rows.forEach((row) =>
  //       console.log(
  //         `Device ${row.deviceGUID} logged the following temperature: ${row.ambientTempInC} *C`
  //       )
  //     );
  //   });

  console.log("Accumulated Energy Import is " + accumulatedEnergyImport);
  return accumulatedEnergyImport;
};
