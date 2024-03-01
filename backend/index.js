const mongoose = require('mongoose');
import app from './express';


// connect to mongo db
try {
    const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;
  mongoose.connect( uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    promiseLibrary: global.Promise,
  });
} catch (error) {
  console.log("Mongo Error"+error);
}


mongoose.connection.on('connected', function () {
  console.log("Server Connected to MongoDB");
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  
console.log(`Failed to Connect to MongoDB : ${JSON.stringify(err)}`)
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log(`Server disconnected to MongoDB : ${config.db}`);
});

process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception: ${JSON.stringify(err.message)}`);
});

process.on('unhandledRejection', (error) => {
    console.log(`Unhandled rejection at ${error}, reason:  ${JSON.stringify(error.message)}`);
});



// listen on port config.port
app.listen(process.env.PORT , () => {
    console.log(`Server Started On Port ${process.env.PORT}`);
});

export default app;