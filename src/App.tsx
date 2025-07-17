import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router";
import { Box, Container } from "@mui/material";
import Page404 from "./pages/Page404";

import HomePage from "./pages/HomePage";
import MissionsPage from "./pages/MissionsPage";
import VehiclePage from "./pages/VehiclePage";
import JobPage from "./pages/JobPage";
import MainPage from "./pages/MainPage";
import MissionDetailPage from "./pages/MissionDetailPage";
import SignaturePage from "./pages/SignaturePage";
import JobEditPage from "./pages/JobEditPage";
import KilometerPage from "./pages/KilometerPage";
import CrewPage from "./pages/CrewPage";
import WorkSessionPage from "./pages/WorkSessionPage";
import CommandePage from "./pages/CommandePage";

function App() {
  return (
    <HashRouter>
      <Box paddingTop={0}>
        <Container sx={{ mt: 0, px: 0 }}>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route index element={<WorkSessionPage />} />
              <Route path="Commande" element={<CommandePage />} />

              <Route path="/" element={<HomePage />}>
                <Route index element={<Navigate to="Missions" />} />
                <Route path="Missions">
                  <Route index element={<MissionsPage />} />
                </Route>

                <Route path="Vehicule" element={<VehiclePage />} />
              </Route>

              <Route path="CrewList" element={<CrewPage />} />

              <Route path="Missions/:jobId" element={<JobPage />}>
                <Route index element={<Navigate to="Detail" />} />
                <Route path="Detail" element={<MissionDetailPage />} />
                <Route path="EditDetail" element={<JobEditPage />} />
                <Route path="Signature" element={<SignaturePage />} />
              </Route>

              <Route path="Km" element={<KilometerPage />} />

              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </Container>
      </Box>
    </HashRouter>
  );
}

export default App;
