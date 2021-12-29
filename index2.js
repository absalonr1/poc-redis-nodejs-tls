import express from 'express'
//import redis conection
import redisInit from './helpers/redis.js'
//import some function
import { getRedisValue } from './services/testService.js'
// Constants - you can use environment
const NODE_PORT = 3007;
const NODE_HOST = '0.0.0.0';
const NODE_ENV = 'development';

const app = express();
//init redis conection
redisInit.getConnection()

//define your api method (you can set in routes dir)
app.get('/api/v1/test/:val', async (req, res) => {
  try {
    const result = await getRedisValue(req.params.val)
    console.log("result ", result)
    if (result) {
      res.json({ status: true, message: "ok", data: { value: result } })
    }
    else {
      res.status(404).json({ status: false, message: "Not Found", data: {} })
    }
  } catch (error) {
    console.log("error ", error)
    res.status(500).send("Ha ocurrido un error interno")
  }
});

app.get('/api/v1/liveness', async (req, res) => {
  res.json({ status: true, message: "ok", data: { value: result } })
});

app.listen(NODE_PORT, NODE_HOST, async () => {
  console.log(`success ${NODE_HOST}:${NODE_PORT} - ${NODE_ENV}`)
});