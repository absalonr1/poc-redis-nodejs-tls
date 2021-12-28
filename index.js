import { createClient } from 'redis';

( async () => {

  const client = createClient({
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
  await client.set('key', 'value0101010');
  
  const value = await client.get('key');
  
  console.log("Value: "+value);
  
  // https://github.com/redis/node-redis#disconnect
  //await client.disconnect();

})();
console.log("1");