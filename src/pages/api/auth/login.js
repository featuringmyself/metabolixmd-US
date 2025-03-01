import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { connectToDatabase } from '../../../lib/mongodb';

// This is a simplified login API that doesn't require bcryptjs or jsonwebtoken
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // For now, we'll just return a success message without actual authentication
    return res.status(200).json({ 
      success: true, 
      message: 'Login functionality temporarily disabled',
      user: null,
      token: null
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}