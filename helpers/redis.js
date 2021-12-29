import { createClient } from 'redis';

class Redis {
    constructor() {
        this.host = process.env.REDIS_HOST || 'localhost'
        this.port = process.env.REDIS_PORT || '6379'
        this.connected = false
        this.client = null
    }
    async getConnection() {
        try {
            if (this.connected) return this.client
            else {
                (async () => {
                    this.client = createClient({
                        // socket: {
                        //     port: 6379,
                        //     //host:"redis-dev-cluster.kglkzz.ng.0001.usw2.cache.amazonaws.com",
                        //     host: "master.prod-redis-acl-tls-cluster.0wazm6.use1.cache.amazonaws.com",
                        //     tls: true
                        // },
                        // username: "test-user",
                        // password: "testuser12345678" 
                    });

                    this.client.on('error', (err) => console.log('Redis Client Error', err));
                    await this.client.connect();                    
                    console.log("success_redis_connect ", await this.client.ping())
                })();
                return this.client
            }
        } catch (error) {
            console.log("error ", error)
            this.connected = false
            return null
        }

    }
}
export default new Redis()