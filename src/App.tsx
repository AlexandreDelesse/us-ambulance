import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Box, Container } from "@mui/material";
import Page404 from "./pages/Page404";

import HomePage from "./pages/HomePage";
import MissionsPage from "./pages/MissionsPage";
import VehiclePage from "./pages/VehiclePage";
import JobPage from "./pages/JobPage";
import JobDetailPage from "./pages/JobDetailPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Box paddingTop={5}>
        <Container sx={{ mt: 4, px: 0 }}>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route path="/" element={<HomePage />}>
                <Route index element={<Navigate to="Missions" />} />
                <Route path="Missions">
                  <Route index element={<MissionsPage />} />
                </Route>
                <Route path="Vehicule" element={<VehiclePage />} />
              </Route>

              <Route path="Missions/:jobId" element={<JobPage />}>
                <Route index element={<JobDetailPage />} />
              </Route>

              <Route path="/*" element={<Page404 />} />
            </Route>
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
}

export default App;
