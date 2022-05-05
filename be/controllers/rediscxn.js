const redis = require('redis')
const runApp = async () => {  const client = redis.createClient()
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    console.log('Redis connected!')}
runApp()
