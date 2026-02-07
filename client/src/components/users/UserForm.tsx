import { useState } from "react";
import { userFormSchema } from "../../schemas/userFormSchema";
import type { User } from "../../types/user";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Alert,
  Snackbar
} from "@mui/material";

const initialFormState: User = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};
interface UserFormProps {
  addUser: (user: any) => Promise<void>;
}

const UserForm = ({ addUser }: UserFormProps) => {

  const [formData, setFormData] = useState<User>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    userFormSchema.forEach((field) => {
      const value = (formData as any)[field.name];

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      }

      if (field.pattern && value && !field.pattern.test(value)) {
        newErrors[field.name] =
          field.helperText || `Invalid ${field.label}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      await addUser(formData);
      setFormData(initialFormState); // reset form
      setSuccess(true);
    } catch (err) {
      console.error("Failed to add user", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h5" component="h2" gutterBottom>
        Add User
      </Typography>

      <Stack spacing={2} sx={{ mb: 2 }}>
        {userFormSchema.map((field) => (
          <TextField
            key={field.name}
            id={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            value={(formData as any)[field.name]}
            onChange={handleChange}
            required={field.required}
            error={!!errors[field.name]}
            helperText={errors[field.name]}
            fullWidth
            variant="outlined"
            size="small"
          />
        ))}
      </Stack>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitting}
        fullWidth
        size="large"
      >
        {submitting ? "Saving..." : "Add User"}
      </Button>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          User added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserForm;