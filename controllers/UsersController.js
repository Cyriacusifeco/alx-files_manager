import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
import DBClient from '../utils/db';
import redisClient from '../utils/redis';

class UsersController {
  /**
   * Create a new user in the database.
   * @param {*} req - Express request object
   * @param {*} res - Express response object
   */
  static async postNew(req, res) {
    // Check if email and password are present in the request body
    if (!req.body.email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!req.body.password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const email = req.body.email;
    const password = req.body.password;

    // Check if the email already exists in the database
    const userExists = await DBClient.db.collection('users').findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password using SHA1
    const hashedPassword = sha1(password);

    // Create a new user object
    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
    };

    // Insert the new user into the database
    try {
      await DBClient.db.collection('users').insertOne(newUser);
      return res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
