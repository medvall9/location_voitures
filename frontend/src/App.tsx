import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Accueil from "./pages/Accueil";
import Voitures from "./pages/voitures/Voitures";
import AjouterVoiture from "./pages/voitures/AjouterVoiture";
import EditVoiture from "./pages/voitures/EditVoiture";
import Reservations from "./pages/Reservations";

function App() {
  return (
    <Routes>
      {/* Toutes les pages sous Layout */}
      <Route element={<Layout />}>
        {/* Accueil */}
        <Route path="/" element={<Accueil />} />

        {/* Voitures */}
        <Route path="voitures" element={<Voitures />} />
        <Route path="voitures/ajouter" element={<AjouterVoiture />} />
        <Route path="voitures/edit/:id" element={<EditVoiture />} />

        {/* Reservations */}
        <Route path="reservations" element={<Reservations />} />
      </Route>
    </Routes>
  );
}

export default App;
