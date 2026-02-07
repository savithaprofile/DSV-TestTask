export type FieldType = "text" | "email" | "tel" | "date";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  pattern?: RegExp;
  helperText?: string;
}

export const userFormSchema: FormField[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
    helperText: "Enter first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
    helperText: "Enter last name",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
    pattern: /^\d{10}$/,
    helperText: "Enter 10-digit phone number",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    helperText: "Enter valid email",
  }
];