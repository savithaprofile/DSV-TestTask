import UserForm from "./components/users/UserForm";
import UserTable from "./components/users/UserTable";
import { useUsers } from "./hooks/useUsers";
import Loader from "./components/common/Loader";
import Error from "./components/common/Error";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme
} from "@mui/material";

// Create a default theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const App = () => {
  const {
    users,
    loading,
    error,
    addUser,
    editUser,
    removeUser,
  } = useUsers();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
          DSV React CRUD
        </Typography>

        {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><Loader /></Box>}
        {error && <Error message={error} />}

        <Card sx={{ mb: 4, elevation: 3 }}>
          <CardContent>
            <UserForm addUser={addUser} />
          </CardContent>
        </Card>

        <Card sx={{ elevation: 3 }}>
          <CardContent>
            <UserTable
              users={users}
              editUser={editUser}
              removeUser={removeUser}
            />
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default App;