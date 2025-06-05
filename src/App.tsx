import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Box, Container } from "@mui/material";
import Page404 from "./pages/Page404";

import HomePage from "./pages/HomePage";
import MissionsPage from "./pages/MissionsPage";
import VehiclePage from "./pages/VehiclePage";
import JobPage from "./pages/JobPage";
import MainPage from "./pages/MainPage";
import MissionDetailPage from "./pages/MissionDetailPage";
import SignaturePage from "./pages/SignaturePage";

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
                <Route index element={<Navigate to="Detail" />} />
                <Route path="Detail" element={<MissionDetailPage />} />
                <Route path="EditDetail" element={<>Edit detail</>} />
                <Route path="Signature" element={<SignaturePage />} />
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
