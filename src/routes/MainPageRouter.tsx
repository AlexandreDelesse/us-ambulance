import { Route, Routes } from "react-router";

export default function MainPageRouter() {
  return (
    <Routes>
      <Route index element={<div>Index</div>} />
      <Route path="Vehicule" element={<div>Véhicule</div>} />
      <Route path="Missions" element={<div>Missions</div>} />
    </Routes>
  );
}
