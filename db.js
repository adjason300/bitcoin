



const mongoose = require("mongoose");
const server =  'mongodb+srv://aa:GiDwrNEoHlqKmVyu@cluster0.bztki.mongodb.net/?retryWrites=true&w=majority';

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`${server}`,{ useNewUrlParser: true,useNewUrlParser: true,useUnifiedTopology: true  })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error:" + err);
      });
  }
}

module.exports = new Database();