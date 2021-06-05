const mongose = require("../db/mongodb");
const schema = new mongose.Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  data: {
    default: null,
    type: String
  },
  id: {
    default: null,
    type: String
  }
})
const eventDb = mongose.model("eventDb", schema);
module.exports = {eventDb}