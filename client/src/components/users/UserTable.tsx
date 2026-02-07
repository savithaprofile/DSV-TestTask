import { useState } from "react";
import type { User } from "../../types/user";
import { userFormSchema } from "../../schemas/userFormSchema";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Typography,
  Tooltip,
  Box
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface UserTableProps {
  users: User[];
  editUser: (id: string, user: Partial<User>) => Promise<void>;
  removeUser: (id: string) => Promise<void>;
}

const UserTable = ({ users, editUser, removeUser }: UserTableProps) => {

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  const startEdit = (user: User) => {
    setEditingId(user._id || null);
    setEditForm(user);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id: string) => {
    try {
      await editUser(id, editForm);
      setEditingId(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        User List
      </Typography>

      {users.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ py: 2 }}>
          No users found.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={0} variant="outlined">
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'action.hover' }}>
                {userFormSchema.map((field) => (
                  <TableCell key={field.name}><strong>{field.label}</strong></TableCell>
                ))}
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover>
                  {editingId === user._id ? (
                    <>
                      {userFormSchema.map((field) => (
                        <TableCell key={field.name}>
                          <TextField
                            name={field.name}
                            value={(editForm as any)[field.name] || ""}
                            onChange={handleEditChange}
                            size="small"
                            fullWidth
                            variant="standard"
                          />
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <Tooltip title="Save">
                          <IconButton color="success" onClick={() => saveEdit(user._id!)}>
                            <SaveIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <IconButton color="default" onClick={cancelEdit}>
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      {userFormSchema.map((field) => (
                        <TableCell key={field.name}>
                          {(user as any)[field.name]}
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton color="primary" onClick={() => startEdit(user)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={() => removeUser(user._id!)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UserTable;