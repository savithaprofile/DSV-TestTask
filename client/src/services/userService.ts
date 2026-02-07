import axios from "axios";
import type { User } from "../types/user";

const API_URL = "http://localhost:5005/api/users";

/**
 * Get all users
 */
export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(API_URL);
  return response.data;
};

/**
 * Create a new user
 */
export const createUser = async (user: User): Promise<User> => {
  const response = await axios.post<User>(API_URL, user);
  return response.data;
};

/**
 * Update an existing user
 */
export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  const response = await axios.put<User>(`${API_URL}/${id}`, user);
  return response.data;
};

/**
 * Delete a user
 */
export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};