import User from '../models/user.model.js';

const authController = async (req, res) => {
  const { email, phone, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'Email is invalid' });
  }

  if (!phone) {
    errors.push({ field: 'phone', message: 'Phone is required' });
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (phone && !phoneRegex.test(phone)) {
    errors.push({ field: 'phone', message: 'Phone is invalid' });
  }

  if (!password || !password.trim()) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Invalid request', errors });
  }

  const user = await User.create({ email, phone, passwordHash: password });
  return res.status(201).json({
    message: 'User created successfully',
    data: { id: user._id, email, phone },
  });
};

export default authController;
