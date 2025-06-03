import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppBar, Avatar, Box, Container, Toolbar } from "@mui/material";
import Page404 from "./pages/Page404";
import logo from "./assets/logo-us.png";
import UserAvatar from "./Components/User/UserAvatar";
import HomePage from "./pages/HomePage";
import MissionsPage from "./pages/MissionsPage";
import VehiclePage from "./pages/VehiclePage";

function App() {
  return (
    <BrowserRouter>
      <Box paddingTop={5}>
        <AppBar position="fixed">
          <Toolbar>
            <Avatar src={logo} />
            {/* For separation */}
            <Box flex={1} />
            <UserAvatar />
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4, px: 0 }}>
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
              children={
                <>
                  <Route index element={<MissionsPage />} />
                  <Route path="Vehicule" element={<VehiclePage />} />
                </>
              }
            />

            <Route path="/*" element={<Page404 />} />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
}

export default App;
