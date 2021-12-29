import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const redis = require('redis');
const express = require('express');


const redisConnection = async () => {

  const client = redis.createClient({
    //url: 'redis://redis-dev-cluster.kglkzz.ng.0001.usw2.cache.amazonaws.com:6379'
    socket:{
        port:6379,
        //host:"redis-dev-cluster.kglkzz.ng.0001.usw2.cache.amazonaws.com",
        host:"master.prod-redis-acl-tls-cluster.0wazm6.use1.cache.amazonaws.com",

        tls: true
    },
    username:"test-user",
    password:"testuser12345678"
  });
  
   client.on('error', (err) => console.log('Redis Client Error', err));
  
  await client.connect();
  return client;
  
  // https://github.com/redis/node-redis#disconnect
  //await client.disconnect();

};
var conn = await redisConnection();


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

const getRedisValue = async (key) => {
    var ret = await conn.get(key);
   return ret;
  }

app.get('/test/:val', (req, res) => {
    
      getRedisValue(req.params.val).then(
          value => {
            
            if(value == undefined){
                value = "Not From Redis";
                conn.set(req.params.val, req.params.val);
                res.json({ msg:value})
            }
            else{
                value = "From Redis - "+ value;
                res.json({ msg:value})
            }
            console.log("Returning");
          }
      );
      console.log("After then()");
});

app.listen(PORT, HOST);