// const redis = require('redis')

// const client = redis.createClient({
//     socket: {
//         host: 'redis-13950.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
//         port: 13950
//     },
//     password: '5qfY55eJHIkJtkIO2kVI0wuV1WQAg0A2'
// });

// client.on('error', (err) => {
//     console.log('Error ' + err);
// });

const Redis = require('ioredis');
const fs = require('fs');

const client = new Redis({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});
client.ping((err, pong) => {
    console.log(pong)
})
client.on('error', (err) => {
    console.log('redis is disconnected: ', err);
});
client.on('connect', function (err, res) {
    console.log('redis is connected!');
});
client.on('ready', () => {
    console.log('redis is ready');
});


module.exports = client