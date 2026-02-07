import { useEffect, useState, useCallback } from "react";
import type { User } from "../types/user";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to fetch users. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Create user
  const addUser = async (user: User) => {
    try {
      setLoading(true);
      setError(null);
      await createUser(user);
      await fetchUsers(); // refresh list
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to create user. Please try again."
      );
      throw err; // rethrow so form can handle it if needed
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const editUser = async (id: string, user: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      await updateUser(id, user);
      await fetchUsers();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to update user. Please try again."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const removeUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to delete user. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Load users on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    editUser,
    removeUser,
  };
};