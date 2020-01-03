const mongoose = require("mongoose");
const logger = require("./logging");
const connectMongodb = function(config){
  mongoose.Promise = global.Promise;
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true)
  mongoose
    .connect(
        config.get('dbURL'),
      {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    )
    .then(() => logger.info('Connected to MongoDB...'));
  mongoose.connection.on("error", error => {
    console.log('Problem connection to the database'+error) });
}
module.exports = connectMongodb;