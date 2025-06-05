import path from "path";
import { UserDTO } from "../types/index";
import fs from "fs";

// data directory
const DATA_DIR = path.join(__dirname, "..", "..", "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

// create tables if they don't exist
export const initDatabase = (): void => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log("Database directory created successfully");
    }
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([]));
      console.log("Users file created successfully");
    }
  } catch (error) {
    console.error("Error initializing JSON database:", error);
    throw error;
  }
};

// get users
export const getUsers = (): UserDTO[] => {
  try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
    return users as UserDTO[];
  } catch (error) {
    console.error("Error getting users:", error);
    return [];
  }
};

// save users
const saveUsers = (users: UserDTO[]): void => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing user data:", error);
    throw error;
  }
};

// find user by email
export const findUserByEmail = (email: string): UserDTO | null => {
  try {
    const users = getUsers();
    const user = users.find((user: UserDTO) => user.email === email);
    return user || null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

// find user by id
export const findUserById = (id: string): UserDTO | null => {
  try {
    const users = getUsers();
    const user = users.find((user: UserDTO) => user.id === id);
    return user || null;
  } catch (error) {
    console.error("Error finding user by id:", error);
    throw error;
  }
};

// create user
export const createUser = (newUser: UserDTO): UserDTO => {
  try {
    const users = getUsers();
    if (users.find((user: UserDTO) => user.email === newUser.email)) {
      throw new Error("User already exists");
    }
    users.push(newUser);
    saveUsers(users);
    console.log("User created successfully", newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
