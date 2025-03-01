import { hash } from 'bcryptjs';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  // Set CORS and content type headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ success: true });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const { db } = await connectToDatabase();

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const result = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      name,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: result.insertedId,
        email,
        name,
        role: 'user'
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    let errorMessage = 'Internal server error';
    
    if (error.message === 'Unable to connect to the database') {
      errorMessage = 'Database connection failed. Please try again later.';
    } else if (error.code === 11000) {
      errorMessage = 'Email address is already registered';
    }
    
    return res.status(500).json({ success: false, message: errorMessage });
  }
}