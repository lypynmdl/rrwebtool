const express = require("express")
const app = express();
const compression = require("compression")
const {eventDb} = require("./schema/Events")
app.use(compression());
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Credentials", true);
  next();
})

app.use(express.json());

app.use(express.urlencoded({

  extended: true

}));




app.post("/saveEvents", async(req, res) => {
  console.log("保存-----------------------------")
  console.log(req.body)
  const result = await eventDb.create({
    date: req.body.date,
    data: req.body.events,
    id: req.body.id
  })
  console.log("保存数据成功")
  res.send({
    retCode: '200',
    result
  })
})

app.get("/getEvents", async(req, res) => {
  const result = await eventDb.find({})
  console.log("数据获取成功"+ result)
  res.send({
    retCode: '200',
    result
  })
})
app.get("/getEvent/:id", async(req, res) => {
  console.log("查询数据"+ req.params.id)
  const result = await eventDb.findOne({id: req.params.id})
  console.log("查询数据成功"+ result)
  res.send({
    retCode: '200',
    result
  })
})

app.delete("/removeAll", async(req, res) => {
  const result = await eventDb.remove({})
  console.log("删除数据成功"+ result)
  res.send({
    retCode: '200',
    result
  })
})


app.listen("8889", function(){
  console.log("应用已启动，监听8889端口")
})