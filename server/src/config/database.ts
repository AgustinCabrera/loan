import Database from 'better-sqlite3';
import path from 'path';
import { UserDTO } from '../types';
import fs from 'fs';

// initialize database
const DB_DIR = process.env.DB_DIR;
const DB_PATH = process.env.DB_PATH;

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new Database(DB_PATH, {
  verbose: console.log,
});

// create tables if they don't exist
export const initDatabase = (): void => {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        address TEXT NOT NULL,
        loanAmount INTEGER NOT NULL,
        birthDate TEXT NOT NULL,
        phoneNumber TEXT NOT NULL
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const findUserByEmail = (email: string): UserDTO | null => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as
      | UserDTO
      | undefined;
    return user || null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

export const findUserById = (id: string): UserDTO | null => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as UserDTO | undefined;
    return user || null;
  } catch (error) {
    console.error('Error finding user by id:', error);
    throw error;
  }
};

export const createUser = (user: UserDTO): void => {
  try {
    db.prepare(
      'INSERT INTO users (id, name, lastName, email, password, address, loanAmount, birthDate, phoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(
      user.id,
      user.name,
      user.lastName,
      user.email,
      user.password,
      user.address,
      user.loanAmount,
      user.birthDate,
      user.phoneNumber
    );
    console.log('User created successfully', user);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const closeDatabase = (): void => {
  try {
    db.close();
    console.log('Database closed successfully');
  } catch (error) {
    console.error('Error closing database:', error);
  }
};

// initialize the database
initDatabase();

export default db;
