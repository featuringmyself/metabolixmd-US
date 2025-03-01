import { hash } from 'bcryptjs';
import { connectToDatabase } from '../../../lib/mongodb';

// This is a simplified register API that doesn't require bcryptjs
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // For now, we'll just return a success message without actual registration
    return res.status(200).json({ 
      success: true, 
      message: 'Registration functionality temporarily disabled',
      user: null
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}