const mongose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/rrweb-service"
mongose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,// 解决连接报错问题
  useCreateIndex: true, // 解决MongoDB弃用警告
  useFindAndModify: false
})
mongose.connection.on('connected', function(e) {
  console.log('connect success');
});
mongose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(1);
});
module.exports = mongose