import Database from 'better-sqlite3';
import path from 'path';
import { UserDTO } from '../types';
import fs from 'fs';

// data directory
const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// create tables if they don't exist
export const initDatabase = (): void => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log('Database directory created successfully');
    }
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([]));
      console.log('Users file created successfully');
    }
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing JSON database:', error);
    throw error;
  }
};

export const getUsers = (): UserDTO[] => {
  // get all the users from the users.json file
  try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    return JSON.parse(users) as UserDTO[];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

const saveUser = (user: UserDTO): void => {
  // save the user to the users.json file
  try {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing user data:', error);
    throw error;
  }
};

export const findUserByEmail = (email: string): UserDTO | null => {
  try {
    const users = getUsers();
    const user = users.find((user: UserDTO) => user.email === email);
    return user || null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

export const findUserById = (id: string): UserDTO | null => {
  try {
    const users = getUsers();
    const user = users.find((user: UserDTO) => user.id === id);
    return user || null;
  } catch (error) {
    console.error('Error finding user by id:', error);
    throw error;
  }
};

export const createUser = (user: UserDTO): UserDTO => {
  try {
    const users = getUsers();
    if (users.find((user: UserDTO) => user.email === user.email)) {
      throw new Error('User already exists');
    }
    users.push(user);
    saveUser(user);
    console.log('User created successfully', user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
