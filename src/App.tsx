import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router";
import { Container } from "@mui/material";
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
import CommandePage from "./pages/CommandePage";
import WorkSessionPage from "./pages/WorkSessionPage";
import AdminRoute from "./features/admin/AdminRoute";
import AdminCrewListPage from "./features/admin/crews/AdminCrewListPage";

function App() {
  return (
    <HashRouter>
      <Container sx={{ mt: 0, px: 0 }}>
        <Routes>
            <Route path="/" element={<MainPage />}>
              <Route element={<HomePage />}>
                <Route index element={<WorkSessionPage />} />
                <Route path="Vehicule" element={<VehiclePage />} />
                <Route path="Missions" element={<MissionsPage />} />
              </Route>

              <Route path="Commande" element={<CommandePage />} />

              <Route path="Missions/:jobId" element={<JobPage />}>
                <Route index element={<Navigate to="Detail" />} />
                <Route path="Detail" element={<MissionDetailPage />} />
                <Route path="EditDetail" element={<JobEditPage />} />
                <Route path="Signature" element={<SignaturePage />} />
              </Route>

              <Route path="Km" element={<KilometerPage />} />

              <Route element={<AdminRoute />}>
                <Route path="admin/crews" element={<AdminCrewListPage />} />
              </Route>

              <Route path="*" element={<Page404 />} />
            </Route>
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
