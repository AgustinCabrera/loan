import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { UserDTO } from '../types';
import { findUserByEmail, createUser } from '../config/database';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData: UserDTO = {
      ...req.body,
      id: uuidv4(),
    };

    // Check if user exists
    const existingUser = await findUserByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser: UserDTO = {
      ...userData,
      password: hashedPassword,
    };

    await createUser(newUser);

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '24h',
    });

    const { password, ...userWithoutPassword } = newUser;
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '24h',
    });

    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
