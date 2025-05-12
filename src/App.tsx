import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import { AppBar, Button, Container, Toolbar } from "@mui/material";

function App() {

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/users" element={<div>Users</div>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
