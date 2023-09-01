const Redis = require('ioredis');

class RedisClient {
  constructor() {
    this.client = new Redis();

    // Handle errors and log them to the console
    this.client.on('error', (err) => {
      console.error('Redis Error:', err);
    });
  }

  async isAlive() {
    try {
      await this.client.ping();
      return true;
    } catch (error) {
      return false;
    }
  }

  async get(key) {
    return await this.client.get(key);
  }

  async set(key, value, duration) {
    // Set the value with an expiration in seconds
    await this.client.set(key, value, 'EX', duration);
  }

  async del(key) {
    await this.client.del(key);
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();

module.exports = redisClient;
