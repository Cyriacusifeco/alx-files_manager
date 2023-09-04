const dbClient = require('../utils/db').default;
const redisClient = require('../utils/redis');

const AppController = {
  getStatus: (req, res) => {
    // Check if Redis and DB are alive
    const redisAlive = redisClient.isAlive();
    const dbAlive = dbClient.isAlive();

    if (redisAlive && dbAlive) {
      res.status(200).json({ redis: true, db: true });
    } else {
      res.status(500).json({ redis: false, db: false });
    }
  },

  getStats: async (req, res) => {
    try {
      // Get the number of users and files from the DB
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();

      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = AppController;
