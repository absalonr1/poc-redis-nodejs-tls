import redisInit from '../helpers/redis.js'

const getRedisValue = async (key) => {
    const client = redisInit.client
    var ret = await client.get(key);
    return ret;
}
export {
    getRedisValue
}